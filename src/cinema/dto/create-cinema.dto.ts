import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateCinemaSchema = z.object({
  nome: z.string().min(1, { message: 'Nome é obrigatório' }),
  endereco: z.string().min(1, { message: 'Endereço é obrigatório' }),
});

export class CreateCinemaDto extends createZodDto(CreateCinemaSchema) {}
