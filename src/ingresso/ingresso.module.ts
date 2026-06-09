import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { IngressoService } from './ingresso.service';
import { IngressoController } from './ingresso.controller';

@Module({
  imports: [PrismaModule],
  controllers: [IngressoController],
  providers: [IngressoService],
  exports: [IngressoService],
})
export class IngressoModule {}
