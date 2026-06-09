import { createZodDto } from 'nestjs-zod';
import { CreateUserSchema } from './create-user.dto';

// .partial() torna todos os campos opcionais para PATCH
export class UpdateUserDto extends createZodDto(CreateUserSchema.partial()) {}
