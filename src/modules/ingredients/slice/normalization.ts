import { ingredientTypeEntity } from '@/modules/ingredient-types/slice/normalization';
import { Entity } from '@/modules/normalization/domain';
import type { Ingredient } from '../domain';

export const ingredientEntity = new Entity('ingredients', { type: ingredientTypeEntity });

export interface NormalizedIngredients {
  [id: string]: Ingredient;
}

export interface NormalizedEntities {
  ingredients: NormalizedIngredients;
}
