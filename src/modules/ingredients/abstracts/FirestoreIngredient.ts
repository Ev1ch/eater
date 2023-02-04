import type { DocumentData, DocumentReference } from 'firebase/firestore';

export default interface FirestoreIngredient extends DocumentData {
  id: string;
  name: string;
  description: string;
  ingridientTypeRef: DocumentReference;
}
