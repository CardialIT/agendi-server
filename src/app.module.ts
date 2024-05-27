/* eslint-disable */
import { Module } from '@nestjs/common';
import { SchedulingModule } from './modules/Scheduling/scheduling.module';
import { ProfessionalsModule } from './modules/professionals/professionals.module';
import { ClientModule } from './modules/client/client.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [SchedulingModule, ProfessionalsModule, ClientModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
  