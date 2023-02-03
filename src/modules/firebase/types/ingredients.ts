import { Amount } from '@/modules/ingredients/domain';
import { type DocumentData, type DocumentReference } from 'firebase/firestore';

export interface FirestoreIngredient extends DocumentData {
  id : string;
  name : string;
  description : string;
  ingridientTypeRe : DocumentReference
}

export interface IngredientReference {
  amount: Amount,
  ingridientRef: DocumentReference
}
