/* eslint-disable */
import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [SchedulingController],
  providers: [SchedulingService, PrismaService],
})
export class SchedulingModule {}
