import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateSalaSchema = z.object({
  numero: z.number().int().positive({ message: 'Número da sala deve ser positivo' }),
  capacidade: z.number().int().positive({ message: 'Capacidade deve ser positiva' }),
  poltronas: z.array(z.array(z.number().int())).optional().default([]),
  cinemaId: z.number().int().positive({ message: 'cinemaId inválido' }),
});

export class CreateSalaDto extends createZodDto(CreateSalaSchema) {}
