import { createSlice, isFulfilled, PayloadAction } from '@reduxjs/toolkit';

import { hydrate } from '@/store/actions';
import { createAsyncThunk } from '@/store/creators';
import { normalize } from '#/normalization/utils';
import { DEFAULT_PAGE_SIZE } from '../constants';
import type { Tag } from '../domain';
import * as service from '../service';
import { NormalizedTags, tagEntity, NormalizedEntities } from './normalization';

interface TagsState {
  entities: NormalizedTags;
  options: {
    page: {
      size: number;
    };
  };
}

const initialState: TagsState = {
  entities: {},
  options: {
    page: {
      size: DEFAULT_PAGE_SIZE,
    },
  },
};

const name = 'tags';

export const getTags = createAsyncThunk<void, Tag[]>(`${name}/getTags`, async () => {
  const tags = await service.getTags();
  return tags;
});

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setTag(state, { payload }: PayloadAction<Tag>) {
      state.entities[payload.id] = payload;
    },
    setTags(state, { payload }: PayloadAction<NormalizedTags>) {
      Object.assign(state.entities, payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, { payload }) => {
      state.entities = payload.tags.entities;
    });
    builder.addMatcher(isFulfilled(getTags), (state, { payload }) => {
      const {
        entities: { tags },
      } = normalize<NormalizedEntities>(payload, [tagEntity]);

      Object.values(tags).forEach((tag) => {
        state.entities[tag.id] = tag;
      });
    });
  },
});

const { reducer, actions } = slice;
export const { setTag, setTags } = actions;
export * from './selectors';
export default reducer;
