/* eslint-disable */
import { Module } from '@nestjs/common';
import { SchedulingModule } from './modules/Scheduling/scheduling.module';
import { ProfessionalsModule } from './modules/professionals/professionals.module';

@Module({
  imports: [SchedulingModule, ProfessionalsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
