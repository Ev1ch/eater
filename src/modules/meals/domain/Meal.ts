import type { Ingredient, Amount } from '#/ingredients/domain';
import type { Area } from '@/modules/areas/domain';
import type { Category } from '@/modules/categories/domain';
import type Tag from './Tag';

export interface MealIngredient {
  id: string;
  amount: Amount;
  ingredient: Ingredient;
}

interface MealBase {
  id: string;
  name: string;
  instructions: string;
  image: string;
}

export interface NormalizedMeal extends MealBase {
  category: string;
  area: string;
  ingredients: { id: string; ingredient: string; amount: Amount }[];
  tags: string[];
}

export default interface Meal extends MealBase {
  category: Category;
  area: Area;
  ingredients: MealIngredient[];
  tags: Tag[];
}