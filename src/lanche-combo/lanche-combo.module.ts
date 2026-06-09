import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LancheComboService } from './lanche-combo.service';
import { LancheComboController } from './lanche-combo.controller';

@Module({
  imports: [PrismaModule],
  controllers: [LancheComboController],
  providers: [LancheComboService],
  exports: [LancheComboService],
})
export class LancheComboModule {}
