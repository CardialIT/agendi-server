import { Module } from '@nestjs/common';
import { JobTypeController } from './jobType.controller';
import { JobTypeService } from './jobType.service';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [JobTypeController],
  providers: [JobTypeService, PrismaService],
})
export class JobTypeModule {}
