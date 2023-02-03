import type { Paginated } from '#/firebase/abstracts';
import type { Area } from '../domain';

export type GetAreas = (options?: Paginated) => Promise<Area[]>;
