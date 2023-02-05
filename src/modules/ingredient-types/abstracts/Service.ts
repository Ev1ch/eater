import type { Paginated } from '#/firebase/abstracts';
import type { DocumentReference } from '#/firebase/firestore';
import type { IngredientType } from '../domain';

export type GetIngredientTypes = (options?: Paginated) => Promise<IngredientType[]>;
export type GetIngredientTypeByRef = (ref: DocumentReference) => Promise<IngredientType>;
