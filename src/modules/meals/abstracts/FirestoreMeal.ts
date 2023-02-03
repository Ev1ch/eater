import type { DocumentData, DocumentReference } from 'firebase/firestore';
import type { IngredientReference } from '#/ingredients/abstracts';

export default interface FirestoreMeal extends DocumentData {
  id: string;
  name: string;
  instructions: string[];
  image?: string;
  areaRef: DocumentReference;
  categoryRef: DocumentReference;
  tags: DocumentReference[];
  ingridients: IngredientReference[];
}
