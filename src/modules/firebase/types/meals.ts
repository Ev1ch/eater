import { type DocumentData, type DocumentReference } from 'firebase/firestore';
import { IngredientReference } from './ingredients';

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
