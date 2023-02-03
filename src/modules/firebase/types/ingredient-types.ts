import { type DocumentData } from 'firebase/firestore';

export interface FirestoreIngredientType extends DocumentData {
  id : string;
  name : string;
}
