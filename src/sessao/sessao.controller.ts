import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SessaoService } from './sessao.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';

@ApiTags('sessao')
@Controller('sessao')
export class SessaoController {
  constructor(private readonly sessaoService: SessaoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar sessão' })
  create(@Body() dto: CreateSessaoDto) {
    return this.sessaoService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar sessões' })
  findAll() {
    return this.sessaoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar sessão por ID' })
  findOne(@Param('id') id: string) {
    return this.sessaoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar sessão' })
  update(@Param('id') id: string, @Body() dto: UpdateSessaoDto) {
    return this.sessaoService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover sessão' })
  remove(@Param('id') id: string) {
    return this.sessaoService.remove(+id);
  }
}
