import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';
import { CommentsModule } from './comments/comments.module';
import { FilesModule } from './files/files.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';
import { WriteupsModule } from './writeups/writeups.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ReportsController } from './reports/reports.controller';

@Module({
  imports: [AuthModule, ReportsModule, CommentsModule, FilesModule, DashboardModule, UsersModule, WriteupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes(ReportsController)  // Apply the middleware only to the ReportsController
      .forRoutes('*');
  }
}
