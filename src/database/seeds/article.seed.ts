import { faker } from '@faker-js/faker';
import { InterfaceArticle } from '../../interface/interface.seeds';

export default class ArticleSeed {
  public createRandomNews(): InterfaceArticle {
    return {
      image: faker.image.city(),
      title: faker.name.jobTitle(),
      date: faker.date.future(),
      shortDescription: faker.lorem.words(10),
      fullDescription: faker.lorem.paragraphs(5),
      likesQuantity: faker.datatype.number(2000000),
    };
  }
}
