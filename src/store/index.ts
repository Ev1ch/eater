import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import environment from '@/environment/client';
import fridgeReducer from '#/fridge/slice';
import uiReducer from '#/ui/slice';
// import mealsReducer from '#/meals/slice';

export const createStore = () =>
  configureStore({
    reducer: {
      ui: uiReducer,
      // meals: mealsReducer,
      fridge: fridgeReducer,
    },
    devTools: environment.isDevelopment,
  });

const wrapper = createWrapper(createStore);

export default wrapper;
