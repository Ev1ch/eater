import { IResponse } from '#/http/abstracts';

import type { Ingredient } from '../domain';
import ResponseIngredient from './ResponseIngredient';

export interface IGetAllResponse extends IResponse<ResponseIngredient[]> {}

export interface IGetByIdResponse extends IResponse<ResponseIngredient> {}

export default interface IIngredientsService {
  getAll(): Promise<Ingredient[]>;
  getById(id: Pick<Ingredient, 'id'>): Promise<Ingredient | null>;
}
