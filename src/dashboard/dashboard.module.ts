import { Module } from '@nestjs/common';
import { ServiceModule } from './service/service.module';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [ServiceModule],
  controllers: [DashboardController]
})
export class DashboardModule {}
