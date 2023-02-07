/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice } from '@reduxjs/toolkit';

import { hydrate } from '@/store/actions';
import { createAsyncThunk } from '@/store/creators';
import { getFridge, setFridge } from '#/fridge/slice';
import { selectIsSignInPending } from '#/user/slice/selectors';
import { name, actionsTypePrefixes } from '../constants';
import * as service from '../service';
import type { User } from '../domain';

interface UserSlice {
  entity: User | null;
}

const initialState: UserSlice = {
  entity: null,
};

export const getCurrentUser = createAsyncThunk<void, User | null>(
  actionsTypePrefixes.getCurrentUser,
  async () => {
    const user = await service.getCurrentUser();

    return user;
  },
);

export const initAuth = createAsyncThunk<void, void>(
  actionsTypePrefixes.initAuth,
  (_, { dispatch, getState }) => {
    service.authStateObserver((user) => {
      if (user) {
        const isSignInPending = selectIsSignInPending(getState());

        if (isSignInPending) {
          return null;
        }

        dispatch(getCurrentUser());
      } else {
        // dispatch(getCurrentUser.fulfilled(null));
      }
    });
  },
);

export const signInWithPopup = createAsyncThunk<void, User | null>(
  actionsTypePrefixes.signInWithPopup,
  async (_, { dispatch }) => {
    const user = await service.signInWithPopup();

    await dispatch(getFridge()).unwrap();

    return user;
  },
);

export const signOut = createAsyncThunk(actionsTypePrefixes.signOut, async (_, { dispatch }) => {
  await service.signOut();

  dispatch(setFridge(null));
});

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(hydrate, (state, { payload }) => {
        if (state.entity) {
          return;
        }

        state.entity = payload.user.entity;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.entity = payload;
      })
      .addCase(signInWithPopup.fulfilled, (state, { payload }) => {
        state.entity = payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.entity = null;
      });
  },
});

const { reducer } = slice;

export * from './selectors';
export default reducer;
