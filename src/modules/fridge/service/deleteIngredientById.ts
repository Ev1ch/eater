import { doc, fridgesCollection, updateDoc } from '#/firebase/firestore';
import { DeleteIngredientFromFridgeById } from '../abstracts/Service';
import getFridge from './getFridge';

const deleteIngredientById: DeleteIngredientFromFridgeById = async (id: string) => {
  const fridge = await getFridge();
  const fridgeRef = doc(fridgesCollection, fridge.id);
  const rest = fridge.ingredients.filter((i) => i.id !== id);

  await updateDoc(fridgeRef, {
    ingredients: rest,
  });
};

export default deleteIngredientById;
