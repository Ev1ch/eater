import { createSlice, isFulfilled, PayloadAction } from '@reduxjs/toolkit';

import { hydrate } from '@/store/actions';
import { createAsyncThunk } from '@/store/creators';
import { normalize } from '#/normalization/utils';
import { DEFAULT_PAGE_SIZE } from '../constants';
import type { IngredientType } from '../domain';
import * as service from '../service';
import {
  NormalizedIngredientTypes,
  ingredientTypeEntity,
  NormalizedEntities,
} from './normalization';

interface IngredientTypesState {
  entities: NormalizedIngredientTypes;
  options: {
    page: {
      size: number;
    };
  };
}

const initialState: IngredientTypesState = {
  entities: {},
  options: {
    page: {
      size: DEFAULT_PAGE_SIZE,
    },
  },
};

const name = 'ingredientTypes';

export const getIngredientTypes = createAsyncThunk<void, IngredientType[]>(
  `${name}/getIngredientTypes`,
  async () => {
    const ingredientTypes = await service.getIngredientTypes();
    return ingredientTypes;
  },
);

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setIngredientType(state, { payload }: PayloadAction<IngredientType>) {
      state.entities[payload.id] = payload;
    },
    setIngredientTypes(state, { payload }: PayloadAction<NormalizedIngredientTypes>) {
      Object.assign(state.entities, payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, { payload }) => {
      state.entities = payload.ingredientTypes.entities;
    });
    builder.addMatcher(isFulfilled(getIngredientTypes), (state, { payload }) => {
      const {
        entities: { ingredientTypes },
      } = normalize<NormalizedEntities>(payload, [ingredientTypeEntity]);

      Object.values(ingredientTypes).forEach((ingredientType) => {
        state.entities[ingredientType.id] = ingredientType;
      });
    });
  },
});

const { reducer, actions } = slice;
export const { setIngredientType, setIngredientTypes } = actions;
export * from './selectors';
export default reducer;
