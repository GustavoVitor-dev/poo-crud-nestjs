import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { CreateLancheComboDto } from '../lanche-combo/dto/create-lanche-combo.dto';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class PedidoService {
  constructor(private prisma: PrismaService) {}

  // ─── CRUD ───────────────────────────────────────────────────────────────────

  create(dto: CreatePedidoDto) {
    return this.prisma.pedido.create({ data: dto });
  }

  findAll() {
    return this.prisma.pedido.findMany({
      include: { ingressos: true, lanches: true },
    });
  }

  async findOne(id: number) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        ingressos: { include: { sessao: { include: { filme: true, sala: true } } } },
        lanches: true,
      },
    });
    if (!pedido) throw new NotFoundException(`Pedido ${id} não encontrado.`);
    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto) {
    try {
      return await this.prisma.pedido.update({ where: { id }, data: dto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Pedido ${id} não encontrado.`);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.pedido.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw new NotFoundException(`Pedido ${id} não encontrado.`);
      throw error;
    }
  }

  // ─── Métodos UML ────────────────────────────────────────────────────────────

  /** adicionaLanche(lanche) — cria um LancheCombo vinculado ao Pedido */
  async adicionaLanche(pedidoId: number, dto: CreateLancheComboDto) {
    await this.findOne(pedidoId);
    return this.prisma.lancheCombo.create({ data: { ...dto, pedidoId } });
  }

  /** removerLanche(id) — remove o LancheCombo do Pedido */
  async removerLanche(pedidoId: number, lancheId: number) {
    const lanche = await this.prisma.lancheCombo.findUnique({ where: { id: lancheId } });
    if (!lanche || lanche.pedidoId !== pedidoId)
      throw new NotFoundException(`LancheCombo ${lancheId} não encontrado neste pedido.`);
    return this.prisma.lancheCombo.delete({ where: { id: lancheId } });
  }

  /** adicionarIngresso(ingresso) — vincula um Ingresso existente ao Pedido */
  async adicionarIngresso(pedidoId: number, ingressoId: number) {
    await this.findOne(pedidoId);
    const ingresso = await this.prisma.ingresso.findUnique({ where: { id: ingressoId } });
    if (!ingresso) throw new NotFoundException(`Ingresso ${ingressoId} não encontrado.`);
    if (ingresso.pedidoId && ingresso.pedidoId !== pedidoId)
      throw new ConflictException('Ingresso já pertence a outro pedido.');
    return this.prisma.ingresso.update({ where: { id: ingressoId }, data: { pedidoId } });
  }

  /** removerIngresso2(id) — desvincula o Ingresso do Pedido */
  async removerIngresso(pedidoId: number, ingressoId: number) {
    const ingresso = await this.prisma.ingresso.findUnique({ where: { id: ingressoId } });
    if (!ingresso || ingresso.pedidoId !== pedidoId)
      throw new NotFoundException(`Ingresso ${ingressoId} não encontrado neste pedido.`);
    return this.prisma.ingresso.update({
      where: { id: ingressoId },
      data: { pedidoId: null },
    });
  }
}
