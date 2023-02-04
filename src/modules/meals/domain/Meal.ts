import type { Ingredient, Amount } from '#/ingredients/domain';
import type { Area } from '@/modules/areas/domain';
import type { Category } from '@/modules/categories/domain';
import type { Tag } from '@/modules/tags/domain';

export interface MealIngredientBase {
  id: string;
  amount: Amount;
}

export interface MealIngredient extends MealIngredientBase {
  ingredient: Ingredient;
}

export interface NormalizedMealIngredient extends MealIngredientBase {
  ingredient: string;
}

export interface MealBase {
  id: string;
  name: string;
  instructions: string[];
  image?: string;
  creatorId?: string;
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
