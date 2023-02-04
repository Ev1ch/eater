import type { Paginated } from '#/firebase/abstracts';
import type { IngredientType } from '../domain';

export type GetIngredientTypes = (options?: Paginated) => Promise<IngredientType[]>;
