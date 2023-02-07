import type { State } from '@/store/abstracts';
import { createPendingSelector } from '#/ui/selectors';
import { actionsTypePrefixes } from '#/user/constants';

export const selectIsAuthPending = createPendingSelector([
    actionsTypePrefixes.getCurrentUser,
    actionsTypePrefixes.initAuth,

]);
export const selectIsSignInPending = createPendingSelector([actionsTypePrefixes.signInWithPopup]);

export const selectUser = (state: State) => state.user.entity;
