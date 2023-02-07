import { setIngredientTypes } from '@/modules/ingredient-types/slice';
import { NormalizedIngredientTypes } from '@/modules/ingredient-types/slice/normalization';
import { setIngredients } from '@/modules/ingredients/slice';
import { ingredientEntity, NormalizedIngredients } from '@/modules/ingredients/slice/normalization';
import { Entity } from '@/modules/normalization/domain';
import { normalize } from '@/modules/normalization/utils';
import type { Dispatch } from '@/store/abstracts';
import type { Fridge, NormalizedFridge } from '../domain';

export const fridgeEntity = new Entity('fridges', {
  ingredients: [{ ingredient: ingredientEntity }],
});

export interface NormalizedFridges {
  [id: string]: NormalizedFridge;
}

export interface NormalizedEntities {
  ingredientTypes: NormalizedIngredientTypes;
  ingredients: NormalizedIngredients;
  fridges: NormalizedFridges;
}

export const normalizeFridge = (dispatch: Dispatch, fridge: Fridge) => {
  const {
    entities: { fridges: normalizedFridges, ingredients, ingredientTypes },
  } = normalize<NormalizedEntities>(fridge, fridgeEntity);

  dispatch(setIngredients(ingredients));
  dispatch(setIngredientTypes(ingredientTypes));

  return normalizedFridges[fridge.id];
};
