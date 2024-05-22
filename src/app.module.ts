/* eslint-disable */
import { Module } from '@nestjs/common';
import { SchedulingModule } from './modules/Scheduling/scheduling.module';
import { ProfessionalsModule } from './modules/professionals/professionals.module';
import { JobTypeModule } from './modules/jobType/jobType.module';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [SchedulingModule, ProfessionalsModule, JobTypeModule, ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
  