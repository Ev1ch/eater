import { getDocs, tagsCollection } from '#/firebase/firestore';
import { type GetTags } from '../abstracts';
import type { Tag } from '../domain';

const getTags: GetTags = async () => {
  const snapshot = await getDocs(tagsCollection);
  const ingredientTypes = snapshot.docs.map((doc) => doc.data()) as Tag[];
  return ingredientTypes;
};

export default getTags;
