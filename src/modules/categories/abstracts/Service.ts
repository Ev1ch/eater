import type { Paginated } from '#/firebase/abstracts';
import type { Category } from '../domain';

export type GetCategories = (options?: Paginated) => Promise<Category[]>;
