import { createZodDto } from 'nestjs-zod';
import { CreateCinemaSchema } from './create-cinema.dto';

export class UpdateCinemaDto extends createZodDto(CreateCinemaSchema.partial()) {}
