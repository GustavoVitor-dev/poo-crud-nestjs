import { createZodDto } from 'nestjs-zod';
import { CreateSessaoSchema } from './create-sessao.dto';

export class UpdateSessaoDto extends createZodDto(CreateSessaoSchema.partial()) {}
