import type { Paginated } from '#/firebase/abstracts';
import type { DocumentReference } from '#/firebase/firestore';
import type { Tag } from '../domain';

export type GetTags = (options?: Paginated) => Promise<Tag[]>;
export type GetTagByRef = (ref: DocumentReference) => Promise<Tag>;
