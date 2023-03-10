import { DocumentReference } from 'firebase/firestore';
import { categoriesCollection, getDoc, doc } from '#/firebase/firestore';
import { Category } from '../domain';
import { GetCategoryByRef } from '../abstracts';

const getCategoryByRef: GetCategoryByRef = async (ref: DocumentReference) => {
  const snapshot = await getDoc(doc(categoriesCollection, ref.id));

  if (!snapshot.exists()) {
    throw new Error('Category not exists');
  }

  return snapshot.data() as Category;
};

export default getCategoryByRef;
