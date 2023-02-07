import { uniqBy } from 'lodash';

import type { State } from '@/store/abstracts';
import { createSelector } from '@/store/creators';
import type { IngredientType } from '#/ingredient-types/domain';
import { selectIngredients } from '#/ingredients/slice';
import { MealIngredient } from '#/meals/domain';

export const selectFridge = (state: State) => state.fridge.entity;

export const selectFridgeName = createSelector([selectFridge], (fridge) => fridge?.name);

export const selectFridgeIngredients = createSelector(
  [selectFridge, selectIngredients],
  (fridge, ingredients) =>
    fridge?.ingredients.map(
      ({ ingredient, ...other }) =>
        ({
          ingredient: ingredients[ingredient],
          ...other,
        } as MealIngredient),
    ),
);

export const selectFridgeIngredientById = createSelector(
  [selectFridgeIngredients, (state, id: string) => id],
  (ingredients, id) => ingredients?.find(({ id: ingredientId }) => ingredientId === id),
);

export const selectFridgeIngredientsByType = createSelector(
  [selectFridgeIngredients, (state, type: IngredientType) => type],
  (ingredients, type) =>
    ingredients?.filter(
      ({ ingredient: { type: ingredientType } }) => ingredientType.id === type.id,
    ),
);

export const selectFridgeIngredientsTypes = createSelector(
  [selectFridgeIngredients],
  (ingredients) =>
    uniqBy(ingredients, ({ ingredient }) => ingredient.type.id).map(
      ({ ingredient }) => ingredient.type,
    ),
);
