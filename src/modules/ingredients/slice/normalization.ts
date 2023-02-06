import { ingredientTypeEntity } from '@/modules/ingredient-types/slice/normalization';
import { Entity } from '@/modules/normalization/domain';
import { normalize } from '@/modules/normalization/utils';
import type { Dispatch } from '@/store/abstracts';
import type { Ingredient, NormalizedIngredient } from '../domain';

export const ingredientEntity = new Entity('ingredients', { type: ingredientTypeEntity });

export interface NormalizedIngredients {
  [id: string]: NormalizedIngredient;
}

export interface NormalizedEntities {
  ingredients: NormalizedIngredients;
}

export const normalizeIngredients = (dispatch: Dispatch, ingredients: Ingredient[]) => {
  const {
    entities: { ingredients: normalizedIngredients },
  } = normalize<NormalizedEntities>(ingredients, [ingredientEntity]);

  return ingredients.map(({ id }) => normalizedIngredients[id]);
};
