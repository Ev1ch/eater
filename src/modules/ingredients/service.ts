import http from '#/http';

import type { IIngredientsService, IGetAllResponse, IGetByIdResponse } from './abstract';
import type { Ingredient } from './domain';
import { ROUTES } from './constants';
import mapToIngredient from './mapper';

export default class IngredientsService implements IIngredientsService {
  public async getAll() {
    const response = await http.get<IGetAllResponse>(ROUTES.all);
    const json = response.data;
    const responseIngredients = json.data;
    const ingredients = responseIngredients.map(mapToIngredient);

    return ingredients;
  }

  public async getById(id: Pick<Ingredient, 'id'>) {
    const response = await http.get<IGetByIdResponse>(ROUTES.one(id));
    const json = response.data;
    const responseIngredient = json.data;
    const ingredient = mapToIngredient(responseIngredient);

    return ingredient;
  }
}
