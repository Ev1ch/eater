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

export const selectIngredientById = createSelector(
  [selectIngredients, (state, id: string) => id],
  (ingredients, id) => ingredients[id],
);

export const selectIngredientsOrders = (state: State) => state.ingredients.orders;

export const selectNameOrder = createSelector([selectIngredientsOrders], (orders) => orders.name);

export const selectNameOptions = createSelector([selectNameOrder], (order) => order.options);

export const selectNameNormalizedPages = createSelector([selectNameOrder], (order) => order.pages);

export const selectNamePages = createSelector(
  [selectIngredients, selectNameNormalizedPages],
  (ingredients, pages) =>
    pages.map(({ ingredients: currentIngredients }) => ({
      ingredients: currentIngredients.map((ingredient) => ingredients[ingredient]),
    })),
);

export const selectNameCurrentPageIndex = createSelector(
  [selectNameOptions],
  (options) => options.page.index,
);

export const selectNameCurrentPage = createSelector(
  [selectNamePages, selectNameCurrentPageIndex],
  (pages, index) => pages[index - 1],
);

export const selectNamePageSize = createSelector(
  [selectNameOptions],
  (options) => options.page.size,
);

export const selectNamePagesToCurrent = createSelector(
  [selectNamePages, selectNameCurrentPageIndex],
  (pages, index) => pages.slice(0, index),
);
