import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class FilmeService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateFilmeDto) {
    return this.prisma.filme.create({ data: dto as Prisma.FilmeUncheckedCreateInput });
  }

  findAll() {
    return this.prisma.filme.findMany();
  }

  async findOne(id: number) {
    const filme = await this.prisma.filme.findUnique({
      where: { id },
      include: { cinema: true, sessoes: true },
    });
    if (!filme) throw new NotFoundException(`Filme ${id} não encontrado.`);
    return filme;
  }

  async update(id: number, dto: UpdateFilmeDto) {
    try {
      return await this.prisma.filme.update({ where: { id }, data: dto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Filme ${id} não encontrado.`);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.filme.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Filme ${id} não encontrado.`);
      throw error;
    }
  }
}
