import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsInterface } from './interface/news.interface';
import { OneStoryRequestDto } from './dto/one-story-request.dto';
import { CategoryListResponseDto } from './dto/category-list-response.dto';
import { NewsByCategoryResponseDto } from './dto/news-by-category.dto';
import { InterfaceArticle } from '../../interface/interface.seeds';

@Controller('category-list')
export class NewsController implements NewsInterface {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getCategoryList(): Promise<CategoryListResponseDto[]> {
    return this.newsService.getCategoryList();
  }

  @Get('/:categoryId')
  getNewsByCategory(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('count', new DefaultValuePipe(10), ParseIntPipe) count: number,
    @Param('categoryId') categoryId: number,
  ): Promise<NewsByCategoryResponseDto<InterfaceArticle>> {
    const limit = Math.min(count, 100);
    return this.newsService.getNewsByCategory({ page, limit }, categoryId);
  }

  @Get('/:categoryId/:newsId')
  getOneStory(@Param() dto: OneStoryRequestDto): Promise<InterfaceArticle> {
    return this.newsService.getOneStory(dto);
  }
}
