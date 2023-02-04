import { Entity } from '@/modules/normalization/domain';
import type { Ingredient } from '../domain';

export const ingredientEntity = new Entity('ingredients');

export interface NormalizedIngredients {
  [id: string]: Ingredient;
}

export interface NormalizedEntities {
  ingredients: NormalizedIngredients;
}
