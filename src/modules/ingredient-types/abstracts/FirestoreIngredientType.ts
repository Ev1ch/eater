import { type DocumentData } from 'firebase/firestore';

export default interface FirestoreIngredientType extends DocumentData {
  id: string;
  name: string;
}
