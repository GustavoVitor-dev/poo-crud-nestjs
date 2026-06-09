import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { CreateSalaDto } from '../sala/dto/create-sala.dto';
import { CreateFilmeDto } from '../filme/dto/create-filme.dto';
import { CreateSessaoDto } from '../sessao/dto/create-sessao.dto';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class CinemaService {
  constructor(private prisma: PrismaService) {}

  // CRUD

  async create(dto: CreateCinemaDto) {
    return this.prisma.cinema.create({ data: dto });
  }

  findAll() {
    return this.prisma.cinema.findMany({
      include: { _count: { select: { salas: true, filmes: true, sessoes: true } } },
    });
  }

  async findOne(id: number) {
    const cinema = await this.prisma.cinema.findUnique({
      where: { id },
      include: { salas: true, filmes: true, sessoes: true },
    });
    if (!cinema) throw new NotFoundException(`Cinema ${id} nao encontrado.`);
    return cinema;
  }

  async update(id: number, dto: UpdateCinemaDto) {
    try {
      return await this.prisma.cinema.update({ where: { id }, data: dto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Cinema ${id} nao encontrado.`);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.cinema.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Cinema ${id} nao encontrado.`);
      throw error;
    }
  }

  // Metodos UML

  async cadastrarSala(cinemaId: number, dto: CreateSalaDto) {
    await this.findOne(cinemaId);
    return this.prisma.sala.create({ data: { ...dto, cinemaId } });
  }

  async removerSala(cinemaId: number, salaId: number) {
    await this.findOne(cinemaId);
    try {
      return await this.prisma.sala.delete({ where: { id: salaId, cinemaId } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Sala ${salaId} nao encontrada neste cinema.`);
      throw error;
    }
  }

  async cadastrarFilme(cinemaId: number, dto: CreateFilmeDto) {
    await this.findOne(cinemaId);
    return this.prisma.filme.create({
      data: { ...dto, cinemaId } as Prisma.FilmeUncheckedCreateInput,
    });
  }

  async removerFilme(cinemaId: number, filmeId: number) {
    await this.findOne(cinemaId);
    try {
      return await this.prisma.filme.delete({ where: { id: filmeId, cinemaId } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Filme ${filmeId} nao encontrado neste cinema.`);
      throw error;
    }
  }

  async cadastrarSessao(cinemaId: number, dto: CreateSessaoDto) {
    await this.findOne(cinemaId);
    return this.prisma.sessao.create({
      data: { ...dto, cinemaId } as Prisma.SessaoUncheckedCreateInput,
    });
  }

  async removerSessao(cinemaId: number, sessaoId: number) {
    await this.findOne(cinemaId);
    try {
      return await this.prisma.sessao.delete({ where: { id: sessaoId, cinemaId } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Sessao ${sessaoId} nao encontrada neste cinema.`);
      throw error;
    }
  }
}
