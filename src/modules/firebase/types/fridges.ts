import { type DocumentData } from 'firebase/firestore';
import { IngredientReference } from './ingredients';

export interface FirestoreFridge extends DocumentData {
  id : string;
  userId : string;
  ingridients: IngredientReference[]
}
