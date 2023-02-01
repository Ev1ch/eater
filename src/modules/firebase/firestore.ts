import { getFirestore, collection } from 'firebase/firestore';

import app from './app';

const firestore = getFirestore(app);

export const mealsCollection = collection(firestore, 'meals');

export const ingredientsCollection = collection(firestore, 'ingredients');

export const ingredientTypesCollection = collection(firestore, 'ingredientTypes');

export const areasCollection = collection(firestore, 'areas');

export const categoriesCollection = collection(firestore, 'categories');

export const fridgesCollection = collection(firestore, 'fridges');

export { doc } from 'firebase/firestore';
