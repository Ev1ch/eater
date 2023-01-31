import type { Ingredient, Amount } from '#/ingredients/domain';

import type Tag from './Tag';

export interface MealIngredient {
  amount: Amount;
  ingredient: Ingredient;
}

export default interface Meal {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  image: string;
  ingredients: MealIngredient[];
  tags: Tag[];
}
