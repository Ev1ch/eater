import { DocumentReference } from 'firebase/firestore';
import { getDoc, doc, ingredientTypesCollection } from '#/firebase/firestore';
import { IngredientType } from '../domain';
import { GetIngredientTypeByRef } from '../abstracts';

const getIngredientTypeByRef: GetIngredientTypeByRef = async (ref: DocumentReference) => {
  const snapshot = await getDoc(doc(ingredientTypesCollection, ref.id));

  if (!snapshot.exists()) {
    throw new Error('Ingredient type not exists');
  }

  return snapshot.data() as IngredientType;
};

export default getIngredientTypeByRef;
