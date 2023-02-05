import type { DocumentData } from 'firebase/firestore';

import type { IngredientReference } from '#/ingredients/abstracts';

export default interface FirestoreFridge extends DocumentData {
  id: string;
  userId: string;
  ingredients: IngredientReference[];
}
