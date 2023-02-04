import { Entity } from '@/modules/normalization/domain';
import type { IngredientType } from '../domain';

export const ingredientTypeEntity = new Entity('ingredientTypes');

export interface NormalizedIngredientTypes {
  [id: string]: IngredientType;
}

export interface NormalizedEntities {
  ingredientTypes: NormalizedIngredientTypes;
}
