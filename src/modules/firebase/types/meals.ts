import { type DocumentData, type DocumentReference } from 'firebase/firestore';
import { Amount } from '../../ingredients/domain';

export interface FirestoreMeal extends DocumentData {
  id : string;
  name : string;
  instructions : string[];
  image?: string;
  areaRef : DocumentReference;
  categoryRef : DocumentReference;
  tags : DocumentReference[];
  ingridients : IngredientReference[];
}
export interface IngredientReference {
  amount: Amount,
  ingridientRef: DocumentReference
}
