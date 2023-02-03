import { DocumentReference } from 'firebase/firestore';
import { areasCollection, getDoc, doc } from '#/firebase/firestore';
import { Area } from '../domain';

const getAreaByRef = async (ref: DocumentReference) => {
  const snapshot = await getDoc(doc(areasCollection, ref.id));

  if (!snapshot.exists()) {
    throw new Error('Area not exists');
  }

  return snapshot.data() as Area;
};

export default getAreaByRef;
