import { createZodDto } from 'nestjs-zod';
import { CreateLancheComboSchema } from './create-lanche-combo.dto';

export class UpdateLancheComboDto extends createZodDto(CreateLancheComboSchema.partial()) {}
