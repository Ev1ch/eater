import {
  doc,
  ingredientsCollection,
  updateDoc,
  arrayUnion,
  fridgesCollection,
} from '#/firebase/firestore';
import { getRandomId } from '#/firebase/utils';
import { getIngredientById } from '@/modules/ingredients/service';
import { NormalizedMealIngredient } from '@/modules/meals/domain/Meal';
import { AddFridgeIngredient } from '../abstracts/Service';
import getFridge from './getFridge';

const addIngredient: AddFridgeIngredient = async (
  ingredientToAdd: Omit<NormalizedMealIngredient, 'id'>,
) => {
  const fridge = await getFridge();
  const ingredientDb = await getIngredientById(ingredientToAdd.ingredient);

  const fridgeRef = doc(fridgesCollection, fridge.id);
  const ingredientId = getRandomId();

  const ingredientRef = doc(ingredientsCollection, ingredientToAdd.ingredient);
  const newIngredient = {
    id: ingredientId,
    amount: ingredientToAdd.amount,
    ingredientRef,
  };

  await updateDoc(fridgeRef, {
    ingredients: arrayUnion(newIngredient),
  });

  return {
    ingredient: ingredientDb,
    id: newIngredient.id,
    amount: newIngredient.amount,
  };
};

export default addIngredient;
