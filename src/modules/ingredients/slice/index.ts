import { createSlice, isFulfilled, PayloadAction } from '@reduxjs/toolkit';

import { hydrate } from '@/store/actions';
import { createAsyncThunk } from '@/store/creators';
import { normalize } from '#/normalization/utils';
import { DEFAULT_PAGE_SIZE } from '../constants';
import type { Ingredient, NormalizedIngredient } from '../domain';
import * as service from '../service';
import { NormalizedIngredients, ingredientEntity, NormalizedEntities } from './normalization';

interface IngredientsState {
  entities: NormalizedIngredients;
  options: {
    page: {
      size: number;
    };
  };
}

const initialState: IngredientsState = {
  entities: {},
  options: {
    page: {
      size: DEFAULT_PAGE_SIZE,
    },
  },
};

const name = 'ingredients';

export const getIngredients = createAsyncThunk<void, Ingredient[]>(
  `${name}/getIngredients`,
  async () => {
    // @ts-expect-error
    const ingredients = await service.getIngredients();
    return ingredients;
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
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, { payload }) => {
      Object.assign(state.entities, payload.ingredients.entities);
    });
    builder.addMatcher(isFulfilled(getIngredients), (state, { payload }) => {
      const {
        entities: { ingredients },
      } = normalize<NormalizedEntities>(payload, [ingredientEntity]);

      Object.values(ingredients).forEach((ingredient) => {
        state.entities[ingredient.id] = ingredient;
      });
    });
  },
});

const { reducer, actions } = slice;
export const { setIngredient, setIngredients } = actions;
export * from './selectors';

export default reducer;
