import { Amount } from '@/modules/ingredients/domain';
import { type DocumentReference } from 'firebase/firestore';

export default interface IngredientReference {
  amount: Amount;
  id: string;
  ingredientRef: DocumentReference;
}
