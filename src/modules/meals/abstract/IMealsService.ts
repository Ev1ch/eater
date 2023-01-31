import { IResponse } from '#/http/abstracts';

import type { Meal } from '../domain';
import ResponseMeal from './ResponseMeal';

export interface IGetAllResponse extends IResponse<ResponseMeal[]> {}

export interface IGetByIdResponse extends IResponse<ResponseMeal> {}

export default interface IMealsService {
  getAll(): Promise<Meal[]>;
  getById(id: Pick<Meal, 'id'>): Promise<Meal | null>;
}
