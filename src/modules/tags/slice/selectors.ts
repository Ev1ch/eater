import type { State } from '@/store/abstracts';

export const selectTags = (state: State) => state.tags.entities;

export const selectTagsArray = (state: State) => Object.values(state.tags.entities);

export const selectTagsOptions = (state: State) => state.tags.options;

export const selectTagById = (state: State, id: string) => selectTags(state)[id];
