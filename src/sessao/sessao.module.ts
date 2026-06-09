import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SessaoService } from './sessao.service';
import { SessaoController } from './sessao.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SessaoController],
  providers: [SessaoService],
  exports: [SessaoService],
})
export class SessaoModule {}
