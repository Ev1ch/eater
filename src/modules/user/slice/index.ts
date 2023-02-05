/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice } from '@reduxjs/toolkit';

import { hydrate } from '@/store/actions';
import { createAsyncThunk } from '@/store/creators';
import * as service from '../service';
import type { User } from '../domain';

interface UserSlice {
  entity: User | null;
}

const initialState: UserSlice = {
  entity: null,
};

const name = 'user';

export const getCurrentUser = createAsyncThunk<void, User | null>(
  `${name}/getCurrentUser`,
  async () => {
    const user = await service.getCurrentUser();

    return user;
  },
);

export const signInWithPopup = createAsyncThunk<void, User | null>(
  `${name}/signInWithPopup`,
  async () => {
    const user = await service.signInWithPopup();

    return user;
  },
);

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(hydrate, (state, { payload }) => {
        state.entity = payload.user.entity;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.entity = payload;
      })
      .addCase(signInWithPopup.fulfilled, (state, { payload }) => {
        state.entity = payload;
      });
  },
});

const { reducer } = slice;

export * from './selectors';
export default reducer;
