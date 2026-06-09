import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateIngressoSchema = z.object({
  valorInteira: z.number().positive({ message: 'Valor inteira deve ser positivo' }),
  valorMeia: z.number().positive({ message: 'Valor meia deve ser positivo' }),
  sessaoId: z.number().int().positive({ message: 'sessaoId inválido' }),
  pedidoId: z.number().int().positive().optional(),
});

export class CreateIngressoDto extends createZodDto(CreateIngressoSchema) {}
