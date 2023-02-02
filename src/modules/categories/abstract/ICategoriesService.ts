import { IResponse } from '#/http/abstracts';

import type { Category } from '../domain';
import ResponseCategory from './ResponseCategory';

export interface IGetAllResponse extends IResponse<ResponseCategory[]> {}

export interface IGetByIdResponse extends IResponse<ResponseCategory> {}

export default interface ICategoriesService {
  getAll(): Promise<Category[]>;
  getById(id: Pick<Category, 'id'>): Promise<Category | null>;
}
