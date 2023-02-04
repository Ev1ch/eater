import { ingredientsCollection, getDoc, doc } from '#/firebase/firestore';
import { getIngredientTypeByRef } from '@/modules/ingredient-types/service';
import { Ingredient } from '../domain';
import { GetIngredientById } from '../abstracts';

const getIngredientById: GetIngredientById = async (id: string) => {
  const snapshot = await getDoc(doc(ingredientsCollection, id));

  if (!snapshot.exists()) {
    throw new Error('Ingredient not exists');
  }

  const data = snapshot.data();
  data.type = await getIngredientTypeByRef(data.ingridientTypeRef);

  delete data.ingridientTypeRef;

  return data as Ingredient;
};

export default getIngredientById;
