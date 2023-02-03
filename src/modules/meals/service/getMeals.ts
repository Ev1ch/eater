import { mealsCollection, getDocs } from '#/firebase/firestore';
import { getAreaByRef } from '@/modules/areas/service';
import { getCategoryByRef } from '@/modules/categories/service';
import { FirestoreMeal, IngredientReference } from '@/modules/firebase/types';
import { getIngredientByRef } from '@/modules/ingredients/service';
import { Tag } from '@/modules/tags/domain';
import { getTagByRef } from '@/modules/tags/service';
import { DocumentReference } from 'firebase/firestore';
import { Meal, MealIngredient } from '../domain';

const getMeals = async (): Promise<Meal[]> => {
  const snapshot = await getDocs(mealsCollection);
  const meals: FirestoreMeal[] = [];

  snapshot.forEach((s) => {
    const data = s.data() as FirestoreMeal;

    meals.push(data);
  });

  return Promise.all(meals.map(async (m) => {
    const area = await getAreaByRef(m.areaRef);
    const category = await getCategoryByRef(m.categoryRef);
    const tags: Tag[] = await Promise.all(m.tags.map(
      (tagRef: DocumentReference) => getTagByRef(tagRef),
    ));

    const ingredients: MealIngredient[] = await Promise.all(m.ingridients.map(
      async (ingredient: IngredientReference) => ({
        ...ingredient,
        ingredient: await getIngredientByRef(ingredient.ingridientRef),
      }),
    ));

    return {
      id: m.id,
      name: m.name,
      instructions: m.instructions,
      image: m.image,
      area,
      category,
      tags,
      ingredients,
    };
  }));
};

export default getMeals;
