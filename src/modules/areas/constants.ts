import { Area } from './domain';

export const API_ROOT = '/areas';

export const ROUTES = {
  all: API_ROOT,
  one: (id: Pick<Area, 'id'>) => `${API_ROOT}/${id}`,
};
