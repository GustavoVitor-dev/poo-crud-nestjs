import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// PartialType torna todos os campos de CreateUserDto opcionais para PATCH
export class UpdateUserDto extends PartialType(CreateUserDto) {}
