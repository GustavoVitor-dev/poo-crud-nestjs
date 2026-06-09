import { createZodDto } from 'nestjs-zod';
import { CreateFilmeSchema } from './create-filme.dto';

export class UpdateFilmeDto extends createZodDto(CreateFilmeSchema.partial()) {}
