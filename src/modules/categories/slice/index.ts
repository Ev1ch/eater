import { createSlice, isFulfilled, PayloadAction } from '@reduxjs/toolkit';

import { hydrate } from '@/store/actions';
import { createAsyncThunk } from '@/store/creators';
import { normalize } from '#/normalization/utils';
import { DEFAULT_PAGE_SIZE } from '../constants';
import type { Category } from '../domain';
import * as service from '../service';
import { NormalizedCategories, categoryEntity, NormalizedEntities } from './normalization';

interface CategoriesState {
  entities: NormalizedCategories;
  options: {
    page: {
      size: number;
    };
  };
}

const initialState: CategoriesState = {
  entities: {},
  options: {
    page: {
      size: DEFAULT_PAGE_SIZE,
    },
  },
};

const name = 'categories';

export const getCategories = createAsyncThunk<void, Category[]>(
  `${name}/getCategories`,
  async () => {
    const categories = await service.getCategories();
    return categories;
  },
);

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setCategory(state, { payload }: PayloadAction<Category>) {
      state.entities[payload.id] = payload;
    },
    setCategories(state, { payload }: PayloadAction<NormalizedCategories>) {
      Object.assign(state.entities, payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, { payload }) => {
      state.entities = payload.categories.entities;
    });
    builder.addMatcher(isFulfilled(getCategories), (state, { payload }) => {
      const {
        entities: { categories },
      } = normalize<NormalizedEntities>(payload, [categoryEntity]);

      Object.values(categories).forEach((category) => {
        state.entities[category.id] = category;
      });
    });
  },
});

const { reducer, actions } = slice;
export const { setCategories, setCategory } = actions;
export * from './selectors';
export default reducer;
