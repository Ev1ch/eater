import http from '#/http';

import type { IAreasService, IGetAllResponse, IGetByIdResponse } from './abstract';
import type { Area } from './domain';
import { ROUTES } from './constants';
import mapToArea from './mapper';

export default class AreasService implements IAreasService {
  public async getAll() {
    const response = await http.get<IGetAllResponse>(ROUTES.all);
    const json = response.data;
    const responseAreas = json.data;
    const areas = responseAreas.map(mapToArea);

    return areas;
  }

  public async getById(id: Pick<Area, 'id'>) {
    const response = await http.get<IGetByIdResponse>(ROUTES.one(id));
    const json = response.data;
    const responseArea = json.data;
    const area = mapToArea(responseArea);

    return area;
  }
}
