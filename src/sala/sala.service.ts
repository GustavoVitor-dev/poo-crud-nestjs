import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class SalaService {
  constructor(private prisma: PrismaService) {}

  // ─── CRUD ───────────────────────────────────────────────────────────────────

  create(dto: CreateSalaDto) {
    return this.prisma.sala.create({ data: dto });
  }

  findAll() {
    return this.prisma.sala.findMany();
  }

  async findOne(id: number) {
    const sala = await this.prisma.sala.findUnique({
      where: { id },
      include: { cinema: true, sessoes: true },
    });
    if (!sala) throw new NotFoundException(`Sala ${id} não encontrada.`);
    return sala;
  }

  async update(id: number, dto: UpdateSalaDto) {
    try {
      return await this.prisma.sala.update({ where: { id }, data: dto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Sala ${id} não encontrada.`);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.sala.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Sala ${id} não encontrada.`);
      throw error;
    }
  }

  // ─── Métodos UML ────────────────────────────────────────────────────────────

  /** reservarPoutrona(fila, num) — marca a poltrona como ocupada (1) */
  async reservarPoltrona(id: number, fila: number, num: number) {
    const sala = await this.prisma.sala.findUnique({ where: { id } });
    if (!sala) throw new NotFoundException(`Sala ${id} não encontrada.`);

    const poltronas = sala.poltronas as number[][];

    if (!poltronas[fila] || poltronas[fila][num] === undefined)
      throw new BadRequestException(`Posição [fila=${fila}, num=${num}] inválida.`);

    if (poltronas[fila][num] === 1)
      throw new ConflictException('Poltrona já reservada.');

    poltronas[fila][num] = 1;

    return this.prisma.sala.update({ where: { id }, data: { poltronas } });
  }

  /** calcularCapacidade() — retorna a quantidade de poltronas livres */
  async calcularCapacidade(id: number) {
    const sala = await this.prisma.sala.findUnique({ where: { id } });
    if (!sala) throw new NotFoundException(`Sala ${id} não encontrada.`);

    const poltronas = sala.poltronas as number[][];
    const livres = poltronas.flat().filter((v) => v === 0).length;

    return { salaId: id, capacidadeLivre: livres, capacidadeTotal: sala.capacidade };
  }
}
