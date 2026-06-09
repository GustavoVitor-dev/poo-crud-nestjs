import { createZodDto } from 'nestjs-zod';
import { CreateIngressoSchema } from './create-ingresso.dto';

export class UpdateIngressoDto extends createZodDto(CreateIngressoSchema.partial()) {}
