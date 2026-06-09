import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LancheComboService } from './lanche-combo.service';
import { CreateLancheComboDto } from './dto/create-lanche-combo.dto';
import { UpdateLancheComboDto } from './dto/update-lanche-combo.dto';

@ApiTags('lanche-combo')
@Controller('lanche-combo')
export class LancheComboController {
  constructor(private readonly lancheComboService: LancheComboService) {}

  @Post()
  @ApiOperation({ summary: 'Criar lanche/combo' })
  create(@Body() dto: CreateLancheComboDto) {
    return this.lancheComboService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar lanches/combos' })
  findAll() {
    return this.lancheComboService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar lanche/combo por ID' })
  findOne(@Param('id') id: string) {
    return this.lancheComboService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar lanche/combo' })
  update(@Param('id') id: string, @Body() dto: UpdateLancheComboDto) {
    return this.lancheComboService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover lanche/combo' })
  remove(@Param('id') id: string) {
    return this.lancheComboService.remove(+id);
  }
}
