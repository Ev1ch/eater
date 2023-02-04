import { areasCollection, getDocs, query, limit, startAt, orderBy, type QueryConstraint } from '#/firebase/firestore';
import { FirestoreArea } from '@/modules/firebase/types';
import { Area } from '../domain';

interface GetAllAreasOptions {
  limit?: number;
  offset?: number;
}

const getAll = async (options: GetAllAreasOptions = {}): Promise<Area[]> => {
  const { limit: limitDocs, offset } = options;

  const queryParams: QueryConstraint[] = [
    orderBy('name'),
  ];
  if (offset) queryParams.push(startAt(offset));
  if (limitDocs) queryParams.push(limit(limitDocs));

  const areasQuery = query(areasCollection, ...queryParams);
  const snapshot = await getDocs(areasQuery);
  const areas: Area[] = [];

  snapshot.forEach((s) => {
    const data = s.data() as FirestoreArea;

    areas.push({
      id: data.id,
      name: data.name,
    });
  });

  return areas;
};

export default getAll;
