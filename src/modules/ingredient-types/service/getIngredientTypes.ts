import { getDocs, ingredientTypesCollection } from '#/firebase/firestore';
import { GetIngredientTypes } from '../abstracts';
import type { IngredientType } from '../domain';

const getIngredientTypes: GetIngredientTypes = async () => {
  const snapshot = await getDocs(ingredientTypesCollection);
  const ingredientTypes = snapshot.docs.map((doc) => doc.data()) as IngredientType[];
  return ingredientTypes;
};

export default getIngredientTypes;
