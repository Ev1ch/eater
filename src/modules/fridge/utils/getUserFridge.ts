import { fridgesCollection, getDocs, query, where } from '@/modules/firebase/firestore';
import { getCurrentUser } from '@/modules/user/service';

const getUserFridgeSnap = async () => {
  // const currentUser = await getCurrentUser();

  // if (!currentUser) {
  //   throw new Error('User is not logged in');
  // }

  const fridgeQuery = query(fridgesCollection, where('userId', '==', '1'));
  const snapshot = await getDocs(fridgeQuery);
  if (!snapshot.size) {
    throw new Error('User fridge is not created');
  }

  return snapshot;
};

export default getUserFridgeSnap;
