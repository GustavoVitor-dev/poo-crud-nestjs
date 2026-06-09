import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLancheComboDto } from './dto/create-lanche-combo.dto';
import { UpdateLancheComboDto } from './dto/update-lanche-combo.dto';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class LancheComboService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateLancheComboDto) {
    return this.prisma.lancheCombo.create({ data: dto });
  }

  findAll() {
    return this.prisma.lancheCombo.findMany();
  }

  async findOne(id: number) {
    const lanche = await this.prisma.lancheCombo.findUnique({ where: { id } });
    if (!lanche) throw new NotFoundException(`LancheCombo ${id} não encontrado.`);
    return lanche;
  }

  async update(id: number, dto: UpdateLancheComboDto) {
    try {
      return await this.prisma.lancheCombo.update({ where: { id }, data: dto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`LancheCombo ${id} não encontrado.`);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.lancheCombo.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`LancheCombo ${id} não encontrado.`);
      throw error;
    }
  }
}
