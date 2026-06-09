import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateSessaoSchema = z.object({
  horarioExibicao: z.string().datetime().transform((val) => new Date(val)),
  filmeId: z.number().int().positive(),
  salaId: z.number().int().positive(),
  cinemaId: z.number().int().positive(),
});

export class CreateSessaoDto extends createZodDto(CreateSessaoSchema) {}
