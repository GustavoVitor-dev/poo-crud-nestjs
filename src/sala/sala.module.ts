import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SalaService } from './sala.service';
import { SalaController } from './sala.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SalaController],
  providers: [SalaService],
  exports: [SalaService],
})
export class SalaModule {}
