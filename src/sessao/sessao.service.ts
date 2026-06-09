import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class SessaoService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSessaoDto) {
    return this.prisma.sessao.create({
      data: dto as Prisma.SessaoUncheckedCreateInput,
      include: { filme: true, sala: true },
    });
  }

  findAll() {
    return this.prisma.sessao.findMany({
      include: { filme: true, sala: true },
    });
  }

  async findOne(id: number) {
    const sessao = await this.prisma.sessao.findUnique({
      where: { id },
      include: { filme: true, sala: true, ingressos: true },
    });
    if (!sessao) throw new NotFoundException(`Sessão ${id} não encontrada.`);
    return sessao;
  }

  async update(id: number, dto: UpdateSessaoDto) {
    try {
      return await this.prisma.sessao.update({
        where: { id },
        data: dto as Prisma.SessaoUncheckedCreateInput,
        include: { filme: true, sala: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Sessão ${id} não encontrada.`);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.sessao.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Sessão ${id} não encontrada.`);
      throw error;
    }
  }
}
