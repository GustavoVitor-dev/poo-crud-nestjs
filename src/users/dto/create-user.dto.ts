import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
