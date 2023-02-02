import { collection, fridgesCollection } from '#/firebase/firestore';
import { INGREDIENTS_SUBCOLLECTION } from '#/firebase/constants';

const getIngredientsSubcollection = async (fridgeId: string) => {
  const subcolletion = collection(fridgesCollection, fridgeId, INGREDIENTS_SUBCOLLECTION);
  return subcolletion;
};

export default getIngredientsSubcollection;
