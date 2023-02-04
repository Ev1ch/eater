import { fridgesCollection, getDocs, query, where } from '#/firebase/firestore';
import { getCurrentUser } from '#/user/service';
import { IngredientReference } from '@/modules/ingredients/abstracts';
import { getIngredientByRef } from '@/modules/ingredients/service';
import { MealIngredient } from '@/modules/meals/domain';
import { GetOwnFridge } from '../abstracts/Service';
import type { Fridge } from '../domain';

const getFridge: GetOwnFridge = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('User is not logged in');
  }

  const fridgeQuery = query(fridgesCollection, where('userId', '==', currentUser.id));
  const snapshot = await getDocs(fridgeQuery);

  if (!snapshot.size) {
    throw new Error('User fridge is not created');
  }

  const fridge = snapshot.docs[0].data();
  const ingredients: MealIngredient[] = await Promise.all(
    fridge.ingridients.map(async (ingredient: IngredientReference) => ({
      ...ingredient,
      ingredient: await getIngredientByRef(ingredient.ingridientRef),
    })),
  );
  fridge.ingredients = ingredients;

  return fridge as Fridge;
};

export default getFridge;
