import http from '#/http';

import type { IMealsService, IGetAllResponse, IGetByIdResponse } from './abstract';
import type { Meal } from './domain';
import { ROUTES } from './constants';
import mapToMeal from './mapper';

export default class MealsService implements IMealsService {
  public async getAll() {
    const response = await http.get<IGetAllResponse>(ROUTES.all);
    const json = response.data;
    const responseMeals = json.data;
    const meals = responseMeals.map(mapToMeal);

    return meals;
  }

  public async getById(id: Pick<Meal, 'id'>) {
    const response = await http.get<IGetByIdResponse>(ROUTES.one(id));
    const json = response.data;
    const responseMeal = json.data;
    const meal = mapToMeal(responseMeal);

    return meal;
  }
}
