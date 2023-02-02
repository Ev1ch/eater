import { fridgesCollection, getDocs, query, where } from '#/firebase/firestore';
import { getCurrentUser } from '#/user/service';
import type { Fridge } from '../domain';
import getIngredientsSubcollection from './getIngredientsSubcollection';

const getFridge = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('User is not logged in');
  }

  const fridgeQuery = query(fridgesCollection, where('userId', '==', currentUser.id));
  const snapshot = await getDocs(fridgeQuery);

  if (!snapshot.size) {
    throw new Error('User fridge is not created');
  }

  const fridge = snapshot.docs[0].data();
  const subcollection = await getIngredientsSubcollection(fridge.id);
  const ingredientsSnapshot = await getDocs(subcollection);
  const ingredients = ingredientsSnapshot.forEach((doc) => doc.data());
  fridge.ingredients = ingredients;

  return fridge as Fridge;
};

export default getFridge;
