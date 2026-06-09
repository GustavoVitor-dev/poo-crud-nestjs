import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SalaService } from './sala.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';

@ApiTags('sala')
@Controller('sala')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar sala' })
  create(@Body() dto: CreateSalaDto) {
    return this.salaService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar salas' })
  findAll() {
    return this.salaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar sala por ID' })
  findOne(@Param('id') id: string) {
    return this.salaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar sala' })
  update(@Param('id') id: string, @Body() dto: UpdateSalaDto) {
    return this.salaService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover sala' })
  remove(@Param('id') id: string) {
    return this.salaService.remove(+id);
  }

  // ─── Métodos UML ────────────────────────────────────────────────────────────

  @Post(':id/reservar-poltrona')
  @ApiOperation({ summary: 'reservarPoutrona — reserva uma poltrona pelo índice [fila, num]' })
  @ApiResponse({ status: 409, description: 'Poltrona já reservada.' })
  reservarPoltrona(
    @Param('id') id: string,
    @Body() body: { fila: number; num: number },
  ) {
    return this.salaService.reservarPoltrona(+id, body.fila, body.num);
  }

  @Get(':id/capacidade')
  @ApiOperation({ summary: 'calcularCapacidade — retorna poltronas livres e total' })
  calcularCapacidade(@Param('id') id: string) {
    return this.salaService.calcularCapacidade(+id);
  }
}
