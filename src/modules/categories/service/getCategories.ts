import { getDocs, query, doc, getDoc, categoriesCollection } from '#/firebase/firestore';
import { getQuery } from '@/modules/firebase/utils';
import { FirestoreCategory, GetCategories } from '../abstracts';
import { Category } from '../domain';

const getAreas: GetCategories = async (options = {}) => {
  const { page } = options;

  const lastSnapshot = page?.lastId
    ? await getDoc(doc(categoriesCollection, page.lastId))
    : undefined;
  const queryParams = getQuery({
    size: page?.size,
    lastSnapshot,
  });

  const areasQuery = query(categoriesCollection, ...queryParams);
  const snapshot = await getDocs(areasQuery);
  const areas: Category[] = [];

  snapshot.forEach((s) => {
    const data = s.data() as FirestoreCategory;

    areas.push({
      id: data.id,
      name: data.name,
      description: data.description,
      image: data.image,
    });
  });

  return areas;
};

export default getAreas;
