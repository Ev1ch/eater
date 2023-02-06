import type { State } from '@/store/abstracts';

export const selectAreas = (state: State) => state.areas.entities;

export const selectAreasArray = (state: State) => Object.values(state.areas.entities);

export const selectAreasOptions = (state: State) => state.areas.options;

export const selectAreaById = (state: State, id: string) => selectAreas(state)[id];
