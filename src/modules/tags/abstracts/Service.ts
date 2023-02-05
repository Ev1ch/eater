import type { DocumentReference } from '#/firebase/firestore';
import type { Tag } from '../domain';

export type GetTags = () => Promise<Tag[]>;
export type GetTagByRef = (ref: DocumentReference) => Promise<Tag>;
