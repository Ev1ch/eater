import http from '#/http';

import type { ICategoriesService, IGetAllResponse, IGetByIdResponse } from './abstract';
import type { Category } from './domain';
import { ROUTES } from './constants';
import mapToCategory from './mapper';

export default class CategoriesService implements ICategoriesService {
  public async getAll() {
    const response = await http.get<IGetAllResponse>(ROUTES.all);
    const json = response.data;
    const responseCategories = json.data;
    const categories = responseCategories.map(mapToCategory);

    return categories;
  }

  public async getById(id: Pick<Category, 'id'>) {
    const response = await http.get<IGetByIdResponse>(ROUTES.one(id));
    const json = response.data;
    const responseCategory = json.data;
    const caCategory = mapToCategory(responseCategory);

    return caCategory;
  }
}
