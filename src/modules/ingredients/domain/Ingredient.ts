import type { IngredientType } from '#/ingredient-types/domain';

export default interface Ingredient {
  id: string;
  name: string;
  description: string;
  type: IngredientType;
}
