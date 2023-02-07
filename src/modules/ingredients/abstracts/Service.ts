import type { Paginated } from '#/firebase/abstracts';
import type { DocumentReference } from '#/firebase/firestore';
import type { PaginatedSearch } from '#/firebase/abstracts/PaginatedSearch';
import type { Ingredient } from '../domain';

export type GetIngredients = (options?: Paginated) => Promise<Ingredient[]>;
export type GetIngredientByRef = (ref: DocumentReference) => Promise<Ingredient>;
export type GetIngredientById = (id: string) => Promise<Ingredient>;
export type GetIngredientWithSearch = (options: PaginatedSearch) => Promise<Ingredient[]>;
