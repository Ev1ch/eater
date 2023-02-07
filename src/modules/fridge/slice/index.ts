/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { hydrate } from '@/store/actions';
import { createAsyncThunk } from '@/store/creators';
import type { NormalizedMealIngredient } from '#/meals/domain';
import { normalizeMealIngredient } from '#/meals/slice/normalization';
import type { NormalizedFridge } from '../domain';
import * as service from '../service';
import { normalizeFridge } from './normalization';

interface IFridgesSlice {
  entity: NormalizedFridge | null;
}

const initialState: IFridgesSlice = {
  entity: null,
};

const name = 'fridge';

export const getFridge = createAsyncThunk<void, NormalizedFridge>(
  `${name}/getFridge`,
  async (_, { dispatch }) => {
    const fridge = await service.getFridge();
    const normalizedFridge = normalizeFridge(dispatch, fridge);

    return normalizedFridge;
  },
);

export const addFridgeIngredient = createAsyncThunk<
  Omit<NormalizedMealIngredient, 'id'>,
  NormalizedMealIngredient
>(`${name}/addFridgeIngredient`, async (newIngredient, { dispatch }) => {
  const ingredient = await service.addIngredient(newIngredient);
  const normalizedIngredient = normalizeMealIngredient(dispatch, ingredient);

  return normalizedIngredient;
});

export const updateFridgeIngredientById = createAsyncThunk<
  { id: string; updatedIngredient: Omit<NormalizedMealIngredient, 'id'> },
  NormalizedMealIngredient
>(`${name}/updateFridgeIngredientById`, async ({ id, updatedIngredient }, { dispatch }) => {
  // @ts-expect-error
  const ingredient = await service.updateIngredientById(id, updatedIngredient);
  const normalizedIngredient = normalizeMealIngredient(dispatch, ingredient);

  return normalizedIngredient;
});

export const deleteFridgeIngredientById = createAsyncThunk<string, string>(
  `${name}/deleteIngredientById`,
  async (id) => {
    await service.deleteIngredientById(id);
    return id;
  },
);

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setFridge(state, { payload }: PayloadAction<NormalizedFridge | null>) {
      state.entity = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(hydrate, (state, { payload }) => {
        const {
          fridge: { entity },
        } = payload;

        if (!entity) {
          return;
        }

        state.entity = entity;
      })
      .addCase(getFridge.fulfilled, (state, { payload }) => {
        state.entity = payload;
      })
      .addCase(addFridgeIngredient.fulfilled, (state, { payload }) => {
        if (!state.entity) {
          throw new Error('Fridge content is not set');
        }

        state.entity.ingredients.push(payload);
      })
      .addCase(updateFridgeIngredientById.fulfilled, (state, { payload }) => {
        if (!state.entity) {
          throw new Error('Fridge content is not set');
        }

        const index = state.entity.ingredients.findIndex(
          (ingredient) => ingredient.id === payload.id,
        );
        state.entity.ingredients[index] = payload;
      })
      .addCase(deleteFridgeIngredientById.fulfilled, (state, { payload }) => {
        if (!state.entity) {
          throw new Error('Fridge content is not set');
        }

        state.entity.ingredients = state.entity.ingredients.filter(
          (ingredient) => ingredient.id !== payload,
        );
      });
  },
});

const { reducer, actions } = slice;

export const { setFridge } = actions;
export * from './selectors';
export default reducer;
