import { mapValues } from 'lodash';

import type { State } from '@/store/abstracts';
import { createSelector } from '@/store/creators';
import { selectIngredientTypes } from '@/modules/ingredient-types/slice';

export const selectNormalizedIngredients = (state: State) => state.ingredients.entities;

export const selectIngredients = createSelector(
  [selectNormalizedIngredients, selectIngredientTypes],
  (normalizedIngredients, ingredientTypes) =>
    mapValues(normalizedIngredients, (ingredient) => ({
      ...ingredient,
      type: ingredientTypes[ingredient.type],
    })),
);

export const selectIngredientsArray = createSelector([selectIngredients], (ingredients) =>
  Object.values(ingredients),
);

export const selectIngredientsOptions = (state: State) => state.ingredients.options;

export const selectIngredientById = createSelector(
  [selectIngredients, (state, id: string) => id],
  (ingredients, id) => ingredients[id],
);
