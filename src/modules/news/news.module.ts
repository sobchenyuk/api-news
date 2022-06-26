import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { CategoriesEntity } from './entities/categories.entity';
import { NewsEntity } from './entities/news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity, NewsEntity])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
