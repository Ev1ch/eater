import { areasCollection, getDocs, query, doc, getDoc } from '#/firebase/firestore';
import { getQuery } from '@/modules/firebase/utils';
import { FirestoreArea, GetAreas } from '../abstracts';
import { Area } from '../domain';

const getAll: GetAreas = async (options = {}) => {
  const { page } = options;

  const lastSnapshot = page?.lastId ? await getDoc(doc(areasCollection, page.lastId)) : undefined;
  const queryParams = getQuery({
    size: page?.size,
    lastSnapshot,
  });

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
