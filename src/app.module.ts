/* eslint-disable */
import { Module } from '@nestjs/common';
import { SchedulingModule } from './modules/Scheduling/scheduling.module';
import { ProfessionalsModule } from './modules/professionals/professionals.module';
import { TypeModule } from './modules/type/type.module';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [SchedulingModule, ProfessionalsModule, TypeModule, ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
  