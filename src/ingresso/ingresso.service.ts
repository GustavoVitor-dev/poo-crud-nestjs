import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class IngressoService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateIngressoDto) {
    return this.prisma.ingresso.create({
      data: dto,
      include: { sessao: true },
    });
  }

  findAll() {
    return this.prisma.ingresso.findMany({
      include: { sessao: true },
    });
  }

  async findOne(id: number) {
    const ingresso = await this.prisma.ingresso.findUnique({
      where: { id },
      include: { sessao: { include: { filme: true, sala: true } }, pedido: true },
    });
    if (!ingresso) throw new NotFoundException(`Ingresso ${id} não encontrado.`);
    return ingresso;
  }

  async update(id: number, dto: UpdateIngressoDto) {
    try {
      return await this.prisma.ingresso.update({ where: { id }, data: dto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Ingresso ${id} não encontrado.`);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.ingresso.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Ingresso ${id} não encontrado.`);
      throw error;
    }
  }
}
