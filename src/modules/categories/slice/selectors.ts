import type { State } from '@/store/abstracts';

export const selectCategories = (state: State) => state.categories.entities;

export const selectCategoriesArray = (state: State) => Object.values(state.categories.entities);

export const selectCategoriesOptions = (state: State) => state.categories.options;

export const selectCategoryById = (state: State, id: string) => selectCategories(state)[id];
