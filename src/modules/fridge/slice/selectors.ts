import type { State } from '@/store/abstracts';
import type { IngredientType } from '#/ingredient-types/domain';

export const selectFridge = (state: State) => state.fridge;

export const selectFridgeName = (state: State) => selectFridge(state).name;

export const selectFridgeContent = (state: State) => selectFridge(state).content;

export const selectFridgeIngredientById = (state: State, id: string) =>
  selectFridgeContent(state)?.find(({ id: ingredientId }) => ingredientId === id);

export const selectFridgeIngredientsByType = (state: State, type: IngredientType) =>
  selectFridgeContent(state)?.filter(
    ({ ingredient: { type: ingredientType } }) => ingredientType.id === type.id,
  );
