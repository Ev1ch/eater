import { getDocs, ingredientTypesCollection } from '#/firebase/firestore';
import type { IngredientType } from '../domain';

const getIngredientTypes = async () => {
  const snapshot = await getDocs(ingredientTypesCollection);
  const ingredientTypes = snapshot.docs.map((doc) => doc.data()) as IngredientType[];
  return ingredientTypes;
};

export default getIngredientTypes;
