/* eslint-disable */
import { Module } from '@nestjs/common';
import { SchedulingModule } from './modules/Scheduling/scheduling.module';
import { ProfessionalsModule } from './modules/professionals/professionals.module';
import { TypeModule } from './modules/type/type.module';

@Module({
  imports: [SchedulingModule, ProfessionalsModule, TypeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
  