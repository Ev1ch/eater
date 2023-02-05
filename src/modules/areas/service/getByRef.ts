import { areasCollection, getDoc, doc, DocumentReference } from '#/firebase/firestore';
import { GetAreaByRef } from '../abstracts';
import { Area } from '../domain';

const getAreaByRef: GetAreaByRef = async (ref: DocumentReference) => {
  const snapshot = await getDoc(doc(areasCollection, ref.id));

  if (!snapshot.exists()) {
    throw new Error('Area not exists');
  }

  return snapshot.data() as Area;
};

export default getAreaByRef;
