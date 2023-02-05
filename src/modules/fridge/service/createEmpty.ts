import { User } from '@/modules/user/domain';
import { getCurrentUser } from '@/modules/user/service';
import { setDoc, doc, fridgesCollection } from '#/firebase/firestore';
import { getRandomId } from '@/modules/firebase/utils';
import { FirestoreFridge } from '../abstracts';
import { CreateEmptyFridge } from '../abstracts/Service';

const createEmptyFridge: CreateEmptyFridge = async (user?: User): Promise<void> => {
    const currentUser = user || await getCurrentUser();

    if (!currentUser) {
      throw new Error('User is not logged in');
    }

    const fridge: FirestoreFridge = {
      id: getRandomId(),
      userId: currentUser.id,
      ingredients: [],
    };

    await setDoc(doc(fridgesCollection, fridge.id), fridge);
};

export default createEmptyFridge;
