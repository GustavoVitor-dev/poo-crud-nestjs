import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateLancheComboSchema = z.object({
  nome: z.string().min(1, { message: 'Nome é obrigatório' }),
  descricao: z.string().min(1, { message: 'Descrição é obrigatória' }),
  valorUnitario: z.number().positive({ message: 'Valor unitário deve ser positivo' }),
  qtUnidade: z.number().int().positive({ message: 'Quantidade deve ser positiva' }),
  subtotal: z.number().positive({ message: 'Subtotal deve ser positivo' }),
  pedidoId: z.number().int().positive().optional(),
});

export class CreateLancheComboDto extends createZodDto(CreateLancheComboSchema) {}
