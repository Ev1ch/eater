import { normalize as normalizrNormalize } from 'normalizr';

import type { Schema } from '../domain';

export default function normalize<T>(data: unknown, schema: Schema) {
  return normalizrNormalize<unknown, T>(data, schema);
}
