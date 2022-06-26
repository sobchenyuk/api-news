import { MigrationInterface, QueryRunner } from 'typeorm';
import CategoriesNewsSeed from '../seeds/categories-news.seed';
import { NewsEntity } from '../../modules/news/entities/news.entity';
import { CategoriesEntity } from '../../modules/news/entities/categories.entity';

export class SeedCategoriesNews1656243933733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categoriesNewsSeed = new CategoriesNewsSeed();
    const categoriesTitle1 = categoriesNewsSeed.randomCategories();
    const categoriesTitle2 = categoriesNewsSeed.randomCategories();
    const news1 = categoriesNewsSeed.randomNews();
    const news2 = categoriesNewsSeed.randomNews();

    const categoriesRepository =
      queryRunner.manager.getRepository(CategoriesEntity);
    const category1 = new CategoriesEntity();
    category1.title = categoriesTitle1.title;
    await categoriesRepository.save(category1);

    const category2 = new CategoriesEntity();
    category2.title = categoriesTitle2.title;
    await categoriesRepository.save(category2);

    const newsRepository = queryRunner.manager.getRepository(NewsEntity);

    await Promise.all(
      news1.map(async (item) => {
        const createNews = Object.assign(new NewsEntity(), {
          ...item,
          category: category1,
        } as NewsEntity);
        await newsRepository.save(createNews);
      }),
    );

    await Promise.all(
      news2.map(async (item) => {
        const createNews = Object.assign(new NewsEntity(), {
          ...item,
          category: category2,
        } as NewsEntity);
        await newsRepository.save(createNews);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // empty
  }
}
