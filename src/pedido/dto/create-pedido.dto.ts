import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreatePedidoSchema = z.object({
  qtInteira: z.number().int().min(0, { message: 'Quantidade inteira não pode ser negativa' }),
  qtMeia: z.number().int().min(0, { message: 'Quantidade meia não pode ser negativa' }),
  valorTotal: z.number().min(0, { message: 'Valor total não pode ser negativo' }),
});

export class CreatePedidoDto extends createZodDto(CreatePedidoSchema) {}
