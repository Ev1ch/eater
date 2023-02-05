/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, isFulfilled } from '@reduxjs/toolkit';

import { hydrate } from '@/store/actions';
import { createAsyncThunk } from '@/store/creators';
import { DEFAULT_PAGE_SIZE } from '../constants';
import { NormalizedMeal, NormalizedMealIngredient } from '../domain';
import * as service from '../service';
import { NormalizedMeals, normalizeMeals } from './normalization';
import {
  selectCanBeCookedNormalizedPages,
  selectCanBeCookedPageSize,
  selectLatestNormalizedPages,
  selectLatestPageSize,
} from './selectors';

interface MealsPage {
  meals: string[];
}

interface MealsSlice {
  entities: NormalizedMeals;
  orders: {
    canBeCooked: {
      options: {
        page: {
          size: number;
          index: number;
        };
      };
      pages: MealsPage[];
    };
    latest: {
      options: {
        page: {
          size: number;
          index: number;
        };
      };
      pages: MealsPage[];
    };
  };
}

const initialState: MealsSlice = {
  entities: {},
  orders: {
    canBeCooked: {
      options: {
        page: {
          size: DEFAULT_PAGE_SIZE,
          index: 1,
        },
      },
      pages: [],
    },
    latest: {
      options: {
        page: {
          size: DEFAULT_PAGE_SIZE,
          index: 1,
        },
      },
      pages: [],
    },
  },
};

const name = 'meals';

export const getLatestMeals = createAsyncThunk<void, NormalizedMeal[]>(
  `${name}/getLatestMeals`,
  async (_, { dispatch, getState }) => {
    const size = selectLatestPageSize(getState());
    const pages = selectLatestNormalizedPages(getState());
    const lastId = pages.at(-1)?.meals.at(-1);
    const meals = await service.getMeals({
      page: {
        lastId,
        size,
      },
    });
    const normalizedMeals = normalizeMeals(dispatch, meals);

    return normalizedMeals;
  },
);

export const getMealsByIngredients = createAsyncThunk<NormalizedMealIngredient[], NormalizedMeal[]>(
  `${name}/getMealsByIngredients`,
  async (ingredients, { dispatch, getState }) => {
    const size = selectCanBeCookedPageSize(getState());
    const pages = selectCanBeCookedNormalizedPages(getState());
    const lastId = pages.at(-1)?.meals.at(-1);
    // @ts-expect-error
    const meals = await service.getMealsByIngredients(ingredients, {
      page: {
        lastId,
        size,
      },
    });
    const normalizedMeals = normalizeMeals(dispatch, meals);

    return normalizedMeals;
  },
);

const slice = createSlice({
  name,
  initialState,
  reducers: {
    resetCanBeCookedPageIndex(state) {
      state.orders.canBeCooked.options.page.index = 1;
    },
    resetLatestPageIndex(state) {
      state.orders.canBeCooked.options.page.index = 1;
    },
    setCanBeCookedNextPageIndex(state) {
      state.orders.canBeCooked.options.page.index += 1;
    },
    setLatestNextPageIndex(state) {
      state.orders.canBeCooked.options.page.index += 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(hydrate, (state, { payload }) => {
        state.entities = payload.meals.entities;
        state.orders = payload.meals.orders;
      })
      .addCase(getLatestMeals.fulfilled, (state, { payload }) => {
        const { options } = state.orders.latest;
        const currentIndex = options.page.index - 1;

        state.orders.latest.pages[currentIndex] = {
          meals: payload.map(({ id }) => id),
        };
      })
      .addCase(getMealsByIngredients.fulfilled, (state, { payload }) => {
        const { options } = state.orders.canBeCooked;
        const currentIndex = options.page.index - 1;

        state.orders.canBeCooked.pages[currentIndex] = {
          meals: payload.map(({ id }) => id),
        };
      })
      .addMatcher(isFulfilled(getLatestMeals, getMealsByIngredients), (state, { payload }) => {
        payload.forEach((meal) => {
          state.entities[meal.id] = meal;
        });
      });
  },
});

const { reducer, actions } = slice;

export const {
  resetLatestPageIndex,
  resetCanBeCookedPageIndex,
  setLatestNextPageIndex,
  setCanBeCookedNextPageIndex,
} = actions;
export * from './selectors';
export default reducer;
