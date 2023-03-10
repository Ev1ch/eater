import { IngredientReference } from '@/modules/ingredients/abstracts';
import { getIngredientByRef } from '@/modules/ingredients/service';
import { MealIngredient } from '@/modules/meals/domain';
import { GetOwnFridge } from '../abstracts/Service';
import getUserFridgeSnap from '../utils/getUserFridge';
import type { Fridge } from '../domain';

const getFridge: GetOwnFridge = async () => {
  const snapshot = await getUserFridgeSnap();

  const data = snapshot.docs[0].data();
  const fridge = {
    id: data.id,
    userId: data.userId,
    ingredients: data.ingredients,
  };
  const ingredients: MealIngredient[] = await Promise.all(
    fridge.ingredients.map(async (ingredient: IngredientReference) => ({
      id: ingredient.id,
      amount: ingredient.amount,
      ingredient: await getIngredientByRef(ingredient.ingredientRef),
    })),
  );
  fridge.ingredients = ingredients;

  return fridge as Fridge;
};

export default getFridge;
