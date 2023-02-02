import { Ingredient } from './domain';

export const API_ROOT = '/ingredients';

export const ROUTES = {
  all: API_ROOT,
  one: (id: Pick<Ingredient, 'id'>) => `${API_ROOT}/${id}`,
};
