import { Meal } from './domain';

export const API_ROOT = '/meals';

export const ROUTES = {
  all: API_ROOT,
  one: (id: Pick<Meal, 'id'>) => `${API_ROOT}/${id}`,
};
