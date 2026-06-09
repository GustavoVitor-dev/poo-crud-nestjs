import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FilmeService } from './filme.service';
import { FilmeController } from './filme.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FilmeController],
  providers: [FilmeService],
  exports: [FilmeService],
})
export class FilmeModule {}
