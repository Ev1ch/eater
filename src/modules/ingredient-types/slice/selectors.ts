import type { State } from '@/store/abstracts';

export const selectIngredientTypes = (state: State) => state.ingredientTypes.entities;

export const selectIngredientTypesOptions = (state: State) => state.ingredientTypes.options;

export const selectIngredientTypeById = (state: State, id: string) =>
  selectIngredientTypes(state)[id];
