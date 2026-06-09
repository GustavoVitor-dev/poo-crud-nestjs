import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaModule], // Importa o PrismaModule para ter acesso ao PrismaService
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
