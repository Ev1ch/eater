import type { Paginated } from '#/firebase/abstracts';
import type { DocumentReference } from '#/firebase/firestore';
import type { Area } from '../domain';

export type GetAreas = (options?: Paginated) => Promise<Area[]>;
export type GetAreaByRef = (ref: DocumentReference) => Promise<Area>;
