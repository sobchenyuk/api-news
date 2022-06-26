import { faker } from '@faker-js/faker';
import { InterfaceArticleCategory } from '../../interface/interface.seeds';

export default class ArticleCategorySeed {
  public createRandomCategories(): InterfaceArticleCategory {
    return {
      title: faker.name.jobTitle(),
    };
  }
}
