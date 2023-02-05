import { doc, fridgesCollection, updateDoc } from '#/firebase/firestore';
import { DeleteIngredientFromFridgeById } from '../abstracts/Service';
import { FirestoreFridge } from '../abstracts';
import { getUserFridgeSnap } from '../utils';

const deleteIngredientById: DeleteIngredientFromFridgeById = async (id: string) => {
  const snapshot = await getUserFridgeSnap();

  const data = snapshot.docs[0].data();
  const fridge: FirestoreFridge = {
    id: data.id,
    userId: data.userId,
    ingredients: data.ingredients,
  };
  const fridgeRef = doc(fridgesCollection, fridge.id);
  const rest = fridge.ingredients.filter((i) => i.id !== id);

  await updateDoc(fridgeRef, {
    ingredients: rest,
  });
};

export default deleteIngredientById;
