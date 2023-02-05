import { getDocs, query, doc, getDoc, ingredientsCollection } from '#/firebase/firestore';
import { getQuery } from '@/modules/firebase/utils';
import { getIngredientTypeByRef } from '@/modules/ingredient-types/service';
import { FirestoreIngredient, GetIngredients } from '../abstracts';
import { Ingredient } from '../domain';

const getIngredients: GetIngredients = async (options = {}) => {
  const { page } = options;

  const lastSnapshot = page?.lastId ?
    await getDoc(doc(ingredientsCollection, page.lastId)) : undefined;
  const queryParams = getQuery({
    size: page?.size,
    lastSnapshot,
  });

  const ingredientsQuery = query(ingredientsCollection, ...queryParams);
  const snapshot = await getDocs(ingredientsQuery);
  const ingredients: Ingredient[] = await Promise.all(snapshot.docs.map(async (s) => {
    const data = s.data() as FirestoreIngredient;

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      type: await getIngredientTypeByRef(data.ingredientTypeRef),
    };
  }));

  return ingredients;
};

export default getIngredients;
