import type { Paginated } from '#/firebase/abstracts';
import type { Ingredient } from '../domain';

export type GetIngredients = (options?: Paginated) => Promise<Ingredient[]>;
