import { ingredientTypeEntity } from '@/modules/ingredient-types/slice/normalization';
import { Entity } from '@/modules/normalization/domain';
import type { NormalizedIngredient } from '../domain';

export const ingredientEntity = new Entity('ingredients', { type: ingredientTypeEntity });

export interface NormalizedIngredients {
  [id: string]: NormalizedIngredient;
}

export interface NormalizedEntities {
  ingredients: NormalizedIngredients;
}
