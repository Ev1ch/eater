import { getDoc, doc, mealsCollection } from '#/firebase/firestore';
import { DocumentReference } from 'firebase/firestore';
import { getAreaByRef } from '@/modules/areas/service';
import { getCategoryByRef } from '@/modules/categories/service';
import { getTagByRef } from '@/modules/tags/service';
import { IngredientReference } from '@/modules/ingredients/abstracts';
import { getIngredientByRef } from '@/modules/ingredients/service';
import { Meal } from '../domain';
import { GetMealByRef } from '../abstracts';

const getMealByRef: GetMealByRef = async (ref: DocumentReference) => {
  const snapshot = await getDoc(doc(mealsCollection, ref.id));

  if (!snapshot.exists()) {
    throw new Error('Meal not exists');
  }

  const meal = snapshot.data();

  meal.area = await getAreaByRef(meal.areaRef);
  meal.category = await getCategoryByRef(meal.categoryRef);
  meal.tags = await Promise.all(meal.tags.map((tagRef: DocumentReference) => getTagByRef(tagRef)));

  meal.ingredients = await Promise.all(
    meal.ingredients.map(async (ingredient: IngredientReference) => ({
      id: ingredient.id,
      amount: ingredient.amount,
      ingredient: await getIngredientByRef(ingredient.ingredientRef),
    })),
  );

  return meal as Meal;
};

export default getMealByRef;
