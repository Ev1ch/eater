import { deleteDoc, doc } from '#/firebase/firestore';
import getFridge from './getFridge';
import getIngredientsSubcollection from './getIngredientsSubcollection';

const deleteIngredientById = async (id: string) => {
  const fridge = await getFridge();

  const subcollection = await getIngredientsSubcollection(fridge.id);
  const ref = doc(subcollection, id);

  await deleteDoc(ref);

  return id;
};

export default deleteIngredientById;
