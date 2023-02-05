import type { Paginated } from '#/firebase/abstracts';
import type { DocumentReference } from '#/firebase/firestore';
import type { Category } from '../domain';

export type GetCategories = (options?: Paginated) => Promise<Category[]>;
export type GetCategoryByRef = (ref: DocumentReference) => Promise<Category>;
