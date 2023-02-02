import { doc, setDoc } from '#/firebase/firestore';
import type { MealIngredient } from '#/meals/domain';
import getFridge from './getFridge';
import getIngredientsSubcollection from './getIngredientsSubcollection';

const updateIngredientById = async (id: string, updatedIngredient: Omit<MealIngredient, 'id'>) => {
  const fridge = await getFridge();

  const subcollection = await getIngredientsSubcollection(fridge.id);
  const ref = doc(subcollection, id);
  const ingredient = { id, ...updatedIngredient } as MealIngredient;

  await setDoc(ref, ingredient);

  return ingredient;
};

export default updateIngredientById;
