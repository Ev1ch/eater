import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { State } from '@/store/abstracts';
import { getActionRootType } from '@/store/utils';
import { ThemeMode } from '@/styles/types';
import { actionsTypePrefixes } from '#/user/constants';

interface UiState {
  theme: {
    mode: ThemeMode;
  };
  statuses: {
    pending: Record<string, boolean>;
  };
}

const initialState: UiState = {
  theme: {
    mode: ThemeMode.DARK,
  },
  statuses: {
    pending: {
      [actionsTypePrefixes.getCurrentUser]: true,
      [actionsTypePrefixes.initAuth]: true,
    },
  },
};

const name = 'ui';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setThemeMode: (state, { payload }: PayloadAction<ThemeMode>) => {
      state.theme.mode = payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(isPending, (state, action) => {
      const type = getActionRootType(action);
      state.statuses.pending[type] = true;
    });
    builder.addMatcher(isFulfilled, (state, action) => {
      const type = getActionRootType(action);
      delete state.statuses.pending[type];
    });
    builder.addMatcher(isRejected, (state, action) => {
      const type = getActionRootType(action);
      delete state.statuses.pending[type];
    });
  },
});

export const selectTheme = (state: State) => state.ui.theme;

export const selectThemeMode = (state: State) => state.ui.theme.mode;

const { actions, reducer } = slice;

export const { setThemeMode } = actions;
export default reducer;
