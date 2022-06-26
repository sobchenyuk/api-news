import { OneStoryRequestDto } from '../dto/one-story-request.dto';

export interface NewsInterface {
  getCategoryList();
  getNewsByCategory(Page, Count, categoryId: number);
  getOneStory({ categoryId, newsId }: OneStoryRequestDto);
}
