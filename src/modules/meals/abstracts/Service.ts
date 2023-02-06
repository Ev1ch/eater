import { DocumentReference } from 'firebase/firestore';

import type { Paginated } from '#/firebase/abstracts';
import type { Meal, MealIngredient, NormalizedMeal, NormalizedMealIngredient } from '../domain';

export type GetMeals = (options?: Paginated) => Promise<Meal[]>;

export type GetMealsFromIngredients = (
  ingredients: NormalizedMealIngredient[],
  options?: Paginated,
) => Promise<Meal[]>;

export type GetMissingIngredients = (
  meal: NormalizedMeal,
  ingredients: NormalizedMealIngredient[],
) => Promise<MealIngredient[]>;

// Function return meals which were created by current user
export type GetOwnMeals = (options?: Paginated) => Promise<Meal[]>;

export type AddMeal = (
  meal: Omit<NormalizedMeal, 'id' | 'ingredients'> & {
    ingredients: Omit<NormalizedMealIngredient, 'id'>;
  },
) => Promise<Meal>;

export type GetMealByRef = (ref: DocumentReference) => Promise<Meal>;

export type GetMealById = (id: string) => Promise<Meal>;
