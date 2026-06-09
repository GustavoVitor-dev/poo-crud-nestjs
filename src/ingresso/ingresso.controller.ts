import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IngressoService } from './ingresso.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';

@ApiTags('ingresso')
@Controller('ingresso')
export class IngressoController {
  constructor(private readonly ingressoService: IngressoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar ingresso' })
  create(@Body() dto: CreateIngressoDto) {
    return this.ingressoService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar ingressos' })
  findAll() {
    return this.ingressoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar ingresso por ID' })
  findOne(@Param('id') id: string) {
    return this.ingressoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar ingresso' })
  update(@Param('id') id: string, @Body() dto: UpdateIngressoDto) {
    return this.ingressoService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover ingresso' })
  remove(@Param('id') id: string) {
    return this.ingressoService.remove(+id);
  }
}
