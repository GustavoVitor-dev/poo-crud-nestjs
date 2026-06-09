import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GeneroEnum = z.enum([
  'ACAO',
  'COMEDIA',
  'DRAMA',
  'TERROR',
  'ROMANCE',
  'FICCAO_CIENTIFICA',
  'ANIMACAO',
  'DOCUMENTARIO',
  'THRILLER',
  'AVENTURA',
]);

// z.string().datetime() -> JSON Schema valido (format: "date-time")
// .transform() converte para Date antes de chegar no Prisma
const isoDate = () =>
  z.string().datetime().transform((val) => new Date(val));

export const CreateFilmeSchema = z.object({
  titulo: z.string().min(1),
  sinopse: z.string().min(1),
  classificacao: z.string().min(1),
  duracao: isoDate(),
  elenco: z.string().min(1),
  genero: GeneroEnum,
  dataIniciaExibicao: isoDate(),
  dataFinalExibicao: isoDate(),
  cinemaId: z.number().int().positive(),
});

export class CreateFilmeDto extends createZodDto(CreateFilmeSchema) {}
