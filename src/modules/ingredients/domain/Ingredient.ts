import type { IngredientType } from '#/ingredient-types/domain';
import Amount from './Amount';

export interface IngredientBase {
  id: string;
  name: string;
  description: string;
}

export default interface Ingredient extends IngredientBase {
  type: IngredientType;
}

export interface NormalizedIngredient extends IngredientBase {
  type: string;
}

export interface FormIngredient {
  ingredient: string;
  amount: Amount;
}
