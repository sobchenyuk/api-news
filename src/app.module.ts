import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from './modules/news/news.module';
import * as TypeOrmConfig from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig.default),
    NewsModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
