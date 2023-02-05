import { createSlice, isFulfilled, PayloadAction } from '@reduxjs/toolkit';

import { hydrate } from '@/store/actions';
import { createAsyncThunk } from '@/store/creators';
import { normalize } from '#/normalization/utils';
import { DEFAULT_PAGE_SIZE } from '../constants';
import type { Area } from '../domain';
import * as service from '../service';
import { NormalizedAreas, areaEntity, NormalizedEntities } from './normalization';

interface AreasState {
  entities: NormalizedAreas;
  options: {
    page: {
      size: number;
    };
  };
}

const initialState: AreasState = {
  entities: {},
  options: {
    page: {
      size: DEFAULT_PAGE_SIZE,
    },
  },
};

const name = 'areas';

export const getAreas = createAsyncThunk<void, Area[]>(`${name}/getAreas`, async () => {
  // @ts-expect-error
  const areas = await service.getAreas();
  return areas;
});

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setArea(state, { payload }: PayloadAction<Area>) {
      state.entities[payload.id] = payload;
    },
    setAreas(state, { payload }: PayloadAction<NormalizedAreas>) {
      Object.assign(state.entities, payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, { payload }) => {
      state.entities = payload.areas.entities;
    });
    builder.addMatcher(isFulfilled(getAreas), (state, { payload }) => {
      const {
        entities: { areas },
      } = normalize<NormalizedEntities>(payload, [areaEntity]);

      Object.values(areas).forEach((area) => {
        state.entities[area.id] = area;
      });
    });
  },
});

const { reducer, actions } = slice;
export const { setAreas, setArea } = actions;
export * from './selectors';
export default reducer;
