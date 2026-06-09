import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CinemaController],
  providers: [CinemaService],
  exports: [CinemaService],
})
export class CinemaModule {}
