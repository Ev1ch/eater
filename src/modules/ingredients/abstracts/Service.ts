import type { Paginated } from '#/firebase/abstracts';
import type { DocumentReference } from '#/firebase/firestore';
import type { Ingredient } from '../domain';

export type GetIngredients = (options?: Paginated) => Promise<Ingredient[]>;
export type GetIngredientByRef = (ref: DocumentReference) => Promise<Ingredient>;
