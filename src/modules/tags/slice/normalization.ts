import { Entity } from '@/modules/normalization/domain';
import type { Tag } from '../domain';

export const tagEntity = new Entity('tags');

export interface NormalizedTags {
  [id: string]: Tag;
}

export interface NormalizedEntities {
  tags: NormalizedTags;
}
