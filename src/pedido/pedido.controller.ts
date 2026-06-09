import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { CreateLancheComboDto } from '../lanche-combo/dto/create-lanche-combo.dto';

@ApiTags('pedido')
@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  // ─── CRUD ───────────────────────────────────────────────────────────────────

  @Post()
  @ApiOperation({ summary: 'Criar pedido' })
  create(@Body() dto: CreatePedidoDto) {
    return this.pedidoService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar pedidos' })
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pedido por ID (inclui ingressos e lanches)' })
  findOne(@Param('id') id: string) {
    return this.pedidoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar pedido' })
  update(@Param('id') id: string, @Body() dto: UpdatePedidoDto) {
    return this.pedidoService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover pedido' })
  remove(@Param('id') id: string) {
    return this.pedidoService.remove(+id);
  }

  // ─── Métodos UML ────────────────────────────────────────────────────────────

  @Post(':id/lanche')
  @ApiOperation({ summary: 'adicionaLanche — cria e adiciona lanche ao pedido' })
  adicionaLanche(@Param('id') id: string, @Body() dto: CreateLancheComboDto) {
    return this.pedidoService.adicionaLanche(+id, dto);
  }

  @Delete(':id/lanche/:lancheId')
  @ApiOperation({ summary: 'removerLanche — remove lanche do pedido' })
  removerLanche(@Param('id') id: string, @Param('lancheId') lancheId: string) {
    return this.pedidoService.removerLanche(+id, +lancheId);
  }

  @Post(':id/ingresso')
  @ApiOperation({ summary: 'adicionarIngresso — vincula ingresso existente ao pedido' })
  @ApiResponse({ status: 409, description: 'Ingresso já pertence a outro pedido.' })
  adicionarIngresso(
    @Param('id') id: string,
    @Body() body: { ingressoId: number },
  ) {
    return this.pedidoService.adicionarIngresso(+id, body.ingressoId);
  }

  @Delete(':id/ingresso/:ingressoId')
  @ApiOperation({ summary: 'removerIngresso2 — desvincula ingresso do pedido' })
  removerIngresso(@Param('id') id: string, @Param('ingressoId') ingressoId: string) {
    return this.pedidoService.removerIngresso(+id, +ingressoId);
  }
}
