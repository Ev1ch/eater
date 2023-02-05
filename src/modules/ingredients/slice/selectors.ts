import type { State } from '@/store/abstracts';

export const selectIngredients = (state: State) => state.ingredients.entities;

export const selectIngredientsOptions = (state: State) => state.ingredients.options;

export const selectIngredientById = (state: State, id: string) => selectIngredients(state)[id];
