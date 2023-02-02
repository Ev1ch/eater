import { doc, setDoc } from '#/firebase/firestore';
import { getRandomId } from '#/firebase/utils';
import type { MealIngredient } from '#/meals/domain';
import getFridge from './getFridge';
import getIngredientsSubcollection from './getIngredientsSubcollection';

const addIngredient = async (newIngredient: Omit<MealIngredient, 'id'>) => {
  const fridge = await getFridge();

  const subcollection = await getIngredientsSubcollection(fridge.id);
  const ingredientId = getRandomId();
  const ref = doc(subcollection, ingredientId);
  const ingredient = { ...newIngredient, id: ingredientId } as MealIngredient;

  await setDoc(ref, ingredient);

  return ingredient;
};

export default addIngredient;
