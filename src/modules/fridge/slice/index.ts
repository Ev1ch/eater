import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { hydrate } from '@/store/actions';
import type { MealIngredient } from '#/meals/domain';

interface IFridgesSlice {
  id: string | null;
  name: string | null;
  content: MealIngredient[] | null;
}

const initialState: IFridgesSlice = {
  id: null,
  name: null,
  content: null,
};

const name = 'fridge';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    addIngredient(state, { payload }: PayloadAction<MealIngredient>) {
      if (!state.content) {
        throw new Error('Fridge content is not set');
      }

      state.content.push(payload);
    },
    deleteIngredientById(state, { payload }: PayloadAction<string>) {
      if (!state.content) {
        throw new Error('Fridge content is not set');
      }

      state.content = state.content.filter(({ id }) => id !== payload);
    },
    updateIngredientById(
      state,
      { payload }: PayloadAction<{ id: string; ingredient: MealIngredient }>,
    ) {
      if (!state.content) {
        throw new Error('Fridge content is not set');
      }

      const index = state.content.findIndex((ingredient) => ingredient.id === payload.id);
      state.content[index] = payload.ingredient;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, { payload }) => {
      const {
        fridge: { name: sliceName, content },
      } = payload;

      state.name = sliceName;
      state.content = content;
    });
  },
});

const { reducer } = slice;

export default reducer;
