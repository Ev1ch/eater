import { mealsCollection, getDocs } from '#/firebase/firestore';
import { getAreaByRef } from '@/modules/areas/service';
import { getCategoryByRef } from '@/modules/categories/service';
import { Amount } from '@/modules/ingredients/domain';
import { getIngredientByRef } from '@/modules/ingredients/service';
import { getTagByRef } from '@/modules/tags/service';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import { MealIngredient, Tag } from '../domain';

interface IngredientReference {
  amount: Amount,
  ingridientRef: DocumentReference
}

const getMeals = async () => {
  const snapshot = await getDocs(mealsCollection);
  const meals: DocumentData[] = [];

  snapshot.forEach((s) => meals.push(s.data()));

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
      ...m,
      area,
      category,
      tags,
      ingredients,
    };
  }));
};

export default getMeals;
