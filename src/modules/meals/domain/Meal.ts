import type Tag from './Tag';

export default interface Meal {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  image: string;
  tags: Tag[];
}
