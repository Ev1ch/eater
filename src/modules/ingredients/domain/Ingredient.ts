import type { IngredientType } from '#/ingredient-types/domain';

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
