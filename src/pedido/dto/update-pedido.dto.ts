import { createZodDto } from 'nestjs-zod';
import { CreatePedidoSchema } from './create-pedido.dto';

export class UpdatePedidoDto extends createZodDto(CreatePedidoSchema.partial()) {}
