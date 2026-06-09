import { createZodDto } from 'nestjs-zod';
import { CreateSalaSchema } from './create-sala.dto';

export class UpdateSalaDto extends createZodDto(CreateSalaSchema.partial()) {}
