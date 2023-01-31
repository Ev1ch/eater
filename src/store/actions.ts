import { createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { State } from './types';

export const hydrate = createAction<State>(HYDRATE);
