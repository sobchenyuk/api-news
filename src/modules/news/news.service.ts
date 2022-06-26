import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginateRawAndEntities,
} from 'nestjs-typeorm-paginate';

import { NewsInterface } from './interface/news.interface';
import { OneStoryRequestDto } from './dto/one-story-request.dto';
import { CategoryListResponseDto } from './dto/category-list-response.dto';
import { CategoriesEntity } from './entities/categories.entity';
import { NewsEntity } from './entities/news.entity';
import { NewsByCategoryResponseDto } from './dto/news-by-category.dto';
import { InterfaceArticle } from '../../interface/interface.seeds';

@Injectable()
export class NewsService implements NewsInterface {
  private readonly logger = new Logger(NewsService.name);

  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly CategoriesRepository: Repository<CategoriesEntity>,
    @InjectRepository(NewsEntity)
    private readonly NewsRepository: Repository<NewsEntity>,
  ) {}

  async getCategoryList(): Promise<CategoryListResponseDto[]> {
    const selectColumns = ['category.id', 'category.title'];
    const queryBuilder = await this.CategoriesRepository.createQueryBuilder(
      'category',
    )
      .select(selectColumns)
      .getRawMany();

    if (!queryBuilder) {
      throw new UnprocessableEntityException(`Category doesn't exist`);
    }

    return queryBuilder;
  }

  async getNewsByCategory(
    options: IPaginationOptions,
    categoryId: number,
  ): Promise<NewsByCategoryResponseDto<InterfaceArticle>> {
    const selectColumns = [
      'news.id',
      'news.image',
      'news.title',
      'news.date',
      'news.shortDescription',
      'news.likesQuantity',
    ];

    const queryBuilder = this.CategoriesRepository.createQueryBuilder(
      'category',
    )
      .leftJoinAndSelect('category.news', 'news')
      .where('category.id = :categoryId', { categoryId })
      .select(selectColumns)
      .orderBy('news.id', 'ASC');

    const [pagination, rawResults] = await paginateRawAndEntities(
      queryBuilder,
      options,
    );

    return {
      items: rawResults as unknown as InterfaceArticle,
      meta: pagination.meta,
    };
  }

  async getOneStory({
    categoryId,
    newsId,
  }: OneStoryRequestDto): Promise<InterfaceArticle> {
    const selectColumns = [
      'news.id',
      'news.image',
      'news.title',
      'news.fullDescription',
      'news.likesQuantity',
    ];

    const queryBuilder = await this.CategoriesRepository.createQueryBuilder(
      'category',
    )
      .leftJoinAndSelect('category.news', 'news')
      .where('category.id = :categoryId', { categoryId })
      .andWhere('news.id = :newsId', { newsId })
      .select(selectColumns)
      .getRawOne();

    if (!queryBuilder) {
      throw new UnprocessableEntityException(
        `Category by id '${categoryId}' and news by id '${newsId}' doesn't exist`,
      );
    }

    return queryBuilder;
  }
}
