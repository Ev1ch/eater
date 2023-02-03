import { type DocumentData, type DocumentReference } from 'firebase/firestore';

export interface FirestoreIngredient extends DocumentData {
  id : string;
  name : string;
  description : string;
  ingridientTypeRe : DocumentReference
}
