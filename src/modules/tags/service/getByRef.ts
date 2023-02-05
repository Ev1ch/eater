import { DocumentReference } from 'firebase/firestore';
import { tagsCollection, getDoc, doc } from '#/firebase/firestore';
import { Tag } from '../domain';
import { GetTagByRef } from '../abstracts/Service';

const getTagByRef: GetTagByRef = async (ref: DocumentReference) => {
  const snapshot = await getDoc(doc(tagsCollection, ref.id));

  if (!snapshot.exists()) {
    throw new Error('Tag not exists');
  }

  return snapshot.data() as Tag;
};

export default getTagByRef;
