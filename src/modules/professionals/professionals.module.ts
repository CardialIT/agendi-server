/* eslint-disable */
import { Module } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalsController } from './professionals.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService, PrismaService],
})
export class ProfessionalsModule {}
