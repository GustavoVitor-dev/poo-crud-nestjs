import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { CreateSalaDto } from '../sala/dto/create-sala.dto';
import { CreateFilmeDto } from '../filme/dto/create-filme.dto';
import { CreateSessaoDto } from '../sessao/dto/create-sessao.dto';

@ApiTags('cinema')
@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  // ─── CRUD ───────────────────────────────────────────────────────────────────

  @Post()
  @ApiOperation({ summary: 'Criar cinema' })
  @ApiResponse({ status: 201, description: 'Cinema criado.' })
  create(@Body() dto: CreateCinemaDto) {
    return this.cinemaService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar cinemas' })
  findAll() {
    return this.cinemaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cinema por ID' })
  @ApiResponse({ status: 404, description: 'Cinema não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.cinemaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar cinema' })
  update(@Param('id') id: string, @Body() dto: UpdateCinemaDto) {
    return this.cinemaService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover cinema' })
  remove(@Param('id') id: string) {
    return this.cinemaService.remove(+id);
  }

  // ─── Métodos UML ────────────────────────────────────────────────────────────

  @Post(':id/salas')
  @ApiOperation({ summary: 'cadastrarSala — adiciona sala ao cinema' })
  cadastrarSala(@Param('id') id: string, @Body() dto: CreateSalaDto) {
    return this.cinemaService.cadastrarSala(+id, dto);
  }

  @Delete(':id/salas/:salaId')
  @ApiOperation({ summary: 'removerSala — remove sala do cinema' })
  removerSala(@Param('id') id: string, @Param('salaId') salaId: string) {
    return this.cinemaService.removerSala(+id, +salaId);
  }

  @Post(':id/filmes')
  @ApiOperation({ summary: 'cadastrarFilme — adiciona filme ao cinema' })
  cadastrarFilme(@Param('id') id: string, @Body() dto: CreateFilmeDto) {
    return this.cinemaService.cadastrarFilme(+id, dto);
  }

  @Delete(':id/filmes/:filmeId')
  @ApiOperation({ summary: 'removerFilme — remove filme do cinema' })
  removerFilme(@Param('id') id: string, @Param('filmeId') filmeId: string) {
    return this.cinemaService.removerFilme(+id, +filmeId);
  }

  @Post(':id/sessoes')
  @ApiOperation({ summary: 'cadastrarSessao — adiciona sessão ao cinema' })
  cadastrarSessao(@Param('id') id: string, @Body() dto: CreateSessaoDto) {
    return this.cinemaService.cadastrarSessao(+id, dto);
  }

  @Delete(':id/sessoes/:sessaoId')
  @ApiOperation({ summary: 'removerSessao — remove sessão do cinema' })
  removerSessao(@Param('id') id: string, @Param('sessaoId') sessaoId: string) {
    return this.cinemaService.removerSessao(+id, +sessaoId);
  }
}
