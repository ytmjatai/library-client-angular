import { CategoryModel } from './category';
export { CategoryModel } from './category';

export interface BookModel {
  _id?: string;
  name?: string;
  author?: string;
  ISBN?: string;
  summary?: string;
  category?: CategoryModel[],
  thumbnail?: string;
  pictures?: string[];
}
