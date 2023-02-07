import { getDocs, query, doc, getDoc, ingredientsCollection, where } from '#/firebase/firestore';
import { getQuery } from '@/modules/firebase/utils';
import { getIngredientTypeByRef } from '@/modules/ingredient-types/service';
import { FirestoreIngredient, GetIngredientWithSearch } from '../abstracts';
import { Ingredient } from '../domain';

const getIngredientsWithSearch: GetIngredientWithSearch = async (options = { search: '' }) => {
  const { page, search } = options;
  const searchParam: string = `${search}\uf8ff`;

  const lastSnapshot = page?.lastId
    ? await getDoc(doc(ingredientsCollection, page.lastId))
    : undefined;
  const searchParams = [where('name', '>=', search), where('name', '<=', searchParam)];
  const queryParams = [
    ...searchParams,
    ...getQuery({
      size: page?.size,
      lastSnapshot,
      orderBy: 'name',
    }),
  ];

  const ingredientsQuery = query(ingredientsCollection, ...queryParams);
  const snapshot = await getDocs(ingredientsQuery);
  const ingredients: Ingredient[] = await Promise.all(
    snapshot.docs.map(async (s) => {
      const data = s.data() as FirestoreIngredient;

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        type: await getIngredientTypeByRef(data.ingredientTypeRef),
      };
    }),
  );

  return ingredients;
};

export default getIngredientsWithSearch;
