import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { State } from '@/store/abstracts';

const selectPendingActions = (state: State) => state.ui.statuses.pending;

export const createPendingSelector = (actions: string[]) =>
  createDraftSafeSelector(selectPendingActions, (pendingActions) =>
    actions.some((action) => pendingActions[action]),
  );
