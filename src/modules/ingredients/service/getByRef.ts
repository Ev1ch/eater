import { DocumentReference } from 'firebase/firestore';
import { ingredientsCollection, getDoc, doc } from '#/firebase/firestore';
import { getIngredientTypeByRef } from '@/modules/ingredient-types/service';
import { Ingredient } from '../domain';
import { GetIngredientByRef } from '../abstracts';

const getIngredientByRef: GetIngredientByRef = async (ref: DocumentReference) => {
  const snapshot = await getDoc(doc(ingredientsCollection, ref.id));

  if (!snapshot.exists()) {
    throw new Error('Ingredient not exists');
  }

  const data = snapshot.data();
  data.type = await getIngredientTypeByRef(data.ingridientTypeRef);

  return data as Ingredient;
};

export default getIngredientByRef;
