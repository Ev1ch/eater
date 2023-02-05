import { User } from '@/modules/user/domain';
import getCurrentUser from '@/modules/user/service/getCurrentUser';
import { query, where, getDocs, fridgesCollection } from '#/firebase/firestore';
import { CheckFridgeExist } from '../abstracts/Service';

const fridgeExistsForUser: CheckFridgeExist = async (user?: User): Promise<boolean> => {
  const currentUser = user || (await getCurrentUser());

  if (!currentUser) {
    throw new Error('User is not logged in');
  }

  const fridgeQuery = query(fridgesCollection, where('userId', '==', currentUser.id));
  const snapshot = await getDocs(fridgeQuery);

  return !snapshot.empty;
};

export default fridgeExistsForUser;
