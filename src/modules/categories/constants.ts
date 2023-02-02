import { Category } from './domain';

export const API_ROOT = '/categories';

export const ROUTES = {
  all: API_ROOT,
  one: (id: Pick<Category, 'id'>) => `${API_ROOT}/${id}`,
};
