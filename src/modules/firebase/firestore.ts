import { getFirestore, collection } from 'firebase/firestore';

import app from './app';
import {
  AREAS_COLLECTION,
  CATEGORIES_COLLECTION,
  FRIDGES_COLLECTION,
  INGREDIENTS_COLLECTION,
  INGREDIENT_TYPES_COLLECTION,
  MEALS_COLLECTION,
  TAGS_COLLECTION,
} from './constants';

const firestore = getFirestore(app);

export const mealsCollection = collection(firestore, MEALS_COLLECTION);

export const ingredientsCollection = collection(firestore, INGREDIENTS_COLLECTION);

export const ingredientTypesCollection = collection(firestore, INGREDIENT_TYPES_COLLECTION);

export const areasCollection = collection(firestore, AREAS_COLLECTION);

export const tagsCollection = collection(firestore, TAGS_COLLECTION);

export const categoriesCollection = collection(firestore, CATEGORIES_COLLECTION);

export const fridgesCollection = collection(firestore, FRIDGES_COLLECTION);

export {
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  queryEqual,
  where,
  collection,
  setDoc,
  deleteDoc,
  limit,
  startAfter,
  orderBy,
  startAt,
  updateDoc,
  QueryConstraint,
  DocumentReference,
  endAt,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
