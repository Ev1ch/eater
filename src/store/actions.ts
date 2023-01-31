import { createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { State } from './abstracts';

export const hydrate = createAction<State>(HYDRATE);
