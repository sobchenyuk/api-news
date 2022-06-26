import ArticleSeed from './article.seed';
import ArticleCategorySeed from './article-category.seed';
import { InterfaceArticle } from '../../interface/interface.seeds';

export default class CategoriesNewsSeed {
  public randomNews() {
    const News: InterfaceArticle[] = [];
    const articleSeed = new ArticleSeed();

    Array.from({ length: 20 }).forEach(() => {
      News.push(articleSeed.createRandomNews());
    });

    return News;
  }

  public randomCategories() {
    return new ArticleCategorySeed().createRandomCategories();
  }
}
