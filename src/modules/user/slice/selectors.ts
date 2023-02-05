import type { State } from '@/store/abstracts';

export const selectUser = (state: State) => state.user.entity;
