import { createSlice, isFulfilled, PayloadAction } from '@reduxjs/toolkit';

import { hydrate } from '@/store/actions';
import { createAsyncThunk } from '@/store/creators';
import { normalize } from '#/normalization/utils';
import { DEFAULT_PAGE_SIZE } from '../constants';
import type { NormalizedIngredient } from '../domain';
import * as service from '../service';
import {
  NormalizedIngredients,
  normalizeIngredients,
  ingredientEntity,
  NormalizedEntities,
} from './normalization';
import { selectNamePages, selectNamePageSize } from './selectors';

interface IngredientsPage {
  ingredients: string[];
}

interface IngredientsState {
  entities: NormalizedIngredients;
  orders: {
    name: {
      options: {
        page: {
          size: number;
          index: number;
        };
      };
      pages: IngredientsPage[];
    };
  };
}

const initialState: IngredientsState = {
  entities: {},
  orders: {
    name: {
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

const name = 'ingredients';

export const getIngredients = createAsyncThunk<void, NormalizedIngredient[]>(
  `${name}/getIngredients`,
  async (_, { dispatch }) => {
    const ingredients = await service.getIngredients();
    const normalizedIngredients = normalizeIngredients(dispatch, ingredients);

    return normalizedIngredients;
  },
);

export const getLatestIngredients = createAsyncThunk<void, NormalizedIngredient[]>(
  `${name}`,
  async (_, { dispatch, getState }) => {
    const size = selectNamePageSize(getState());
    const pages = selectNamePages(getState());
    const lastId = pages.at(-1)?.ingredients.at(-1)?.id;

    const ingredients = await service.getIngredients({
      page: {
        size,
        lastId,
      },
    });
    const normalizedIngredients = normalizeIngredients(dispatch, ingredients);

    return normalizedIngredients;
  },
);

export const getIngredientsByName = createAsyncThunk<string, NormalizedIngredient[]>(
  `${name}/getIngredientsByName`,
  async (ingredientName, { dispatch, getState }) => {
    const size = selectNamePageSize(getState());
    const pages = selectNamePages(getState());
    const lastId = pages.at(-1)?.ingredients.at(-1);
    // @ts-expect-error
    const ingredients = await service.getIngredientsByName(ingredientName, {
      page: {
        size,
        lastId,
      },
    });
    const normalizedIngredients = normalizeIngredients(dispatch, ingredients);

    return normalizedIngredients;
  },
);

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setIngredient(state, { payload }: PayloadAction<NormalizedIngredient>) {
      state.entities[payload.id] = payload;
    },
    setIngredients(state, { payload }: PayloadAction<NormalizedIngredients>) {
      Object.assign(state.entities, payload);
    },
    resetNamePageIndex(state) {
      state.orders.name.options.page.index = 1;
    },
    setNameNextPageIndex(state) {
      state.orders.name.options.page.index += 1;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, { payload }) => {
      Object.assign(state.entities, payload.ingredients.entities);
      Object.assign(state.orders, payload.ingredients.orders);
    });
    builder
      .addCase(getIngredients.fulfilled, (state, { payload }) => {
        const {
          entities: { ingredients },
        } = normalize<NormalizedEntities>(payload, [ingredientEntity]);

        Object.values(ingredients).forEach((ingredient) => {
          state.entities[ingredient.id] = ingredient;
        });
      })
      .addCase(getIngredientsByName.fulfilled, (state, { payload }) => {
        const { options } = state.orders.name;
        const currentIndex = options.page.index - 1;

        state.orders.name.pages[currentIndex] = {
          ingredients: payload.map(({ id }) => id),
        };
      })
      .addCase(getLatestIngredients.fulfilled, (state, { payload }) => {
        const { options } = state.orders.name;
        const currentIndex = options.page.index - 1;

        state.orders.name.pages[currentIndex] = {
          ingredients: payload.map(({ id }) => id),
        };
      })
      .addMatcher(isFulfilled(getIngredients, getLatestIngredients, getIngredientsByName), (state, { payload }) => {
        payload.forEach((ingredient) => {
          state.entities[ingredient.id] = ingredient;
        });
      });
  },
});

const { reducer, actions } = slice;
export const { setIngredient, setIngredients, resetNamePageIndex, setNameNextPageIndex } = actions;
export * from './selectors';

export default reducer;
