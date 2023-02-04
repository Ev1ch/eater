import { createSlice } from '@reduxjs/toolkit';

import { hydrate } from '@/store/actions';
import type { MealIngredient } from '#/meals/domain';
import { createAsyncThunk } from '@/store/creators';
import * as service from '../service';
import { Fridge } from '../domain';

interface IFridgesSlice {
  entity: Fridge | null;
}

const initialState: IFridgesSlice = {
  entity: null,
};

const name = 'fridge';

export const getFridge = createAsyncThunk<void, Fridge>(`${name}/getFridge`, async () => {
  const fridge = await service.getFridge();
  return fridge;
});

export const addIngredient = createAsyncThunk<Omit<MealIngredient, 'id'>, MealIngredient>(
  `${name}/addIngredient`,
  async (newIngredient) => {
    const ingredient = await service.addIngredient(newIngredient);
    return ingredient;
  },
);

export const updateIngredientById = createAsyncThunk<
  { id: string; updatedIngredient: Omit<MealIngredient, 'id'> },
  MealIngredient
>(`${name}/updateIngredientById`, async ({ id, updatedIngredient }) => {
  const ingredient = await service.updateIngredientById(id, updatedIngredient);
  return ingredient;
});

export const deleteIngredientById = createAsyncThunk<string, string>(
  `${name}/deleteIngredientById`,
  async (id) => {
    await service.deleteIngredientById(id);
    return id;
  },
);

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(hydrate, (state, { payload }) => {
        const {
          fridge: { entity },
        } = payload;

        state.entity = entity;
      })
      .addCase(getFridge.fulfilled, (state, { payload }) => {
        state.entity = payload;
      })
      .addCase(addIngredient.fulfilled, (state, { payload }) => {
        if (!state.entity) {
          throw new Error('Fridge content is not set');
        }

        state.entity.content.push(payload);
      })
      .addCase(updateIngredientById.fulfilled, (state, { payload }) => {
        if (!state.entity) {
          throw new Error('Fridge content is not set');
        }

        const index = state.entity.content.findIndex((ingredient) => ingredient.id === payload.id);
        state.entity.content[index] = payload;
      })
      .addCase(deleteIngredientById.fulfilled, (state, { payload }) => {
        if (!state.entity) {
          throw new Error('Fridge content is not set');
        }

        state.entity.content = state.entity.content.filter(
          (ingredient) => ingredient.id !== payload,
        );
      });
  },
});

const { reducer } = slice;

export default reducer;
