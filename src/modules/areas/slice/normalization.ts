import { Entity } from '@/modules/normalization/domain';
import type { Area } from '../domain';

export const areaEntity = new Entity('areas');

export interface NormalizedAreas {
  [id: string]: Area;
}

export interface NormalizedEntities {
  areas: NormalizedAreas;
}
