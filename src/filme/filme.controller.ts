import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FilmeService } from './filme.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@ApiTags('filme')
@Controller('filme')
export class FilmeController {
  constructor(private readonly filmeService: FilmeService) {}

  @Post()
  @ApiOperation({ summary: 'Criar filme' })
  create(@Body() dto: CreateFilmeDto) {
    return this.filmeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar filmes' })
  findAll() {
    return this.filmeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar filme por ID' })
  findOne(@Param('id') id: string) {
    return this.filmeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar filme' })
  update(@Param('id') id: string, @Body() dto: UpdateFilmeDto) {
    return this.filmeService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover filme' })
  remove(@Param('id') id: string) {
    return this.filmeService.remove(+id);
  }
}
