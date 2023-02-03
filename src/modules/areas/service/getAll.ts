import { areasCollection, getDocs } from '#/firebase/firestore';
import { FirestoreArea } from '@/modules/firebase/types';
import { Area } from '../domain';

const getAll = async (): Promise<Area[]> => {
  const snapshot = await getDocs(areasCollection);
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
