import { IResponse } from '#/http/abstracts';

import type { Area } from '../domain';
import ResponseArea from './ResponseArea';

export interface IGetAllResponse extends IResponse<ResponseArea[]> {}

export interface IGetByIdResponse extends IResponse<ResponseArea> {}

export default interface IAreasService {
  getAll(): Promise<Area[]>;
  getById(id: Pick<Area, 'id'>): Promise<Area | null>;
}
