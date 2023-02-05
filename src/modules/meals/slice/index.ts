/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice } from '@reduxjs/toolkit';

import { hydrate } from '@/store/actions';
import { createAsyncThunk } from '@/store/creators';
import { DEFAULT_PAGE_SIZE } from '../constants';
import { NormalizedMeal } from '../domain';
import * as service from '../service';
import { NormalizedMeals, normalizeMeals } from './normalization';

interface MealsSlice {
  entities: NormalizedMeals;
  options: {
    page: {
      size: number;
    };
  };
}

const initialState: MealsSlice = {
  entities: {},
  options: {
    page: {
      size: DEFAULT_PAGE_SIZE,
    },
  },
};

const name = 'meals';

export const getMeals = createAsyncThunk<void, NormalizedMeal[]>(
  `${name}/getMeals`,
  async (_, { dispatch }) => {
    const meals = await service.getMeals();
    const normalizedMeals = normalizeMeals(dispatch, meals);

    return normalizedMeals;
  },
);

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(hydrate, (state, { payload }) => {
        state.entities = payload.meals.entities;
      })
      .addCase(getMeals.fulfilled, (state, { payload }) => {
        payload.forEach((meal) => {
          state.entities[meal.id] = meal;
        });
      });
  },
});

const { reducer } = slice;

export * from './selectors';
export default reducer;
