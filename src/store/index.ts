import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import environment from '@/environment/client';
import fridgeReducer from '#/fridge/slice';
import uiReducer from '#/ui/slice';
import areasReducer from '#/areas/slice';
import categoriesReducer from '#/categories/slice';
import ingredientTypesReducer from '#/ingredient-types/slice';
import ingredientsReducer from '#/ingredients/slice';
import tagsReducer from '#/tags/slice';
import mealsReducer from '#/meals/slice';

export const createStore = () =>
  configureStore({
    reducer: {
      ui: uiReducer,
      fridge: fridgeReducer,
      areas: areasReducer,
      categories: categoriesReducer,
      ingredientTypes: ingredientTypesReducer,
      ingredients: ingredientsReducer,
      tags: tagsReducer,
      meals: mealsReducer,
    },
    devTools: environment.isDevelopment,
  });

const wrapper = createWrapper(createStore);

export default wrapper;
