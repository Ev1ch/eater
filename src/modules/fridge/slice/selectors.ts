import type { State } from '@/store/abstracts';
import type { IngredientType } from '#/ingredient-types/domain';

export const selectFridge = (state: State) => state.fridge.entity;

export const selectFridgeName = (state: State) => selectFridge(state)?.name;

export const selectFridgeIngredients = (state: State) => selectFridge(state)?.ingredients;

export const selectFridgeIngredientById = (state: State, id: string) =>
  selectFridgeIngredients(state)?.find(({ id: ingredientId }) => ingredientId === id);

export const selectFridgeIngredientsByType = (state: State, type: IngredientType) =>
  selectFridgeIngredients(state)?.filter(
    ({ ingredient: { type: ingredientType } }) => ingredientType.id === type.id,
  );
