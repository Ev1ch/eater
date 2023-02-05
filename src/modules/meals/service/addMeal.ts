import {
  areasCollection,
  categoriesCollection,
  doc,
  ingredientsCollection,
  mealsCollection,
  setDoc,
  tagsCollection,
} from '#/firebase/firestore';
import { getRandomId } from '@/modules/firebase/utils';
import { getCurrentUser } from '@/modules/user/service';
import { AddMeal } from '../abstracts';
import getMealByRef from './getByRef';

const addMeal: AddMeal = async (meal) => {
  const categoryRef = doc(categoriesCollection, meal.category);
  const areaRef = doc(areasCollection, meal.area);
  const tagRefs = meal.tags.map((t) => doc(tagsCollection, t));
  const mealId = getRandomId();
  const user = await getCurrentUser();

  const ingredients = meal.ingredients.map((i) => ({
    id: getRandomId(),
    amount: i.amount,
    ingredientRef: doc(ingredientsCollection, i.ingredient),
  }));

  if (!user) {
    throw new Error('User is not authorized');
  }

  const data = {
    id: mealId,
    name: meal.name,
    instructions: meal.instructions,
    image: meal.image || '',
    creatorId: user.id,
    categoryRef,
    areaRef,
    ingredients,
    tags: tagRefs,
  };

  const newMealRef = doc(mealsCollection, mealId);
  await setDoc(newMealRef, data);

  return getMealByRef(newMealRef);
};

export default addMeal;
