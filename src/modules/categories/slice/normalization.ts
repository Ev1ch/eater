import { Entity } from '@/modules/normalization/domain';
import type { Category } from '../domain';

export const categoryEntity = new Entity('categories');

export interface NormalizedCategories {
  [id: string]: Category;
}

export interface NormalizedEntities {
  categories: NormalizedCategories;
}
