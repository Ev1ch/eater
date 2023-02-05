import type { Paginated } from '#/firebase/abstracts';
import { Amount } from '@/modules/ingredients/domain';
import { DocumentReference } from 'firebase/firestore';
import type { Meal } from '../domain';
import { MealIngredient, NormalizedMeal, NormalizedMealIngredient } from '../domain/Meal';

export type GetMeals = (options?: Paginated) => Promise<Meal[]>;

export type GetMealsFromIngredients = (ingredients: NormalizedMealIngredient[]) => Promise<Meal[]>;

export type GetMissingIngredients = (
  meal: NormalizedMeal,
  ingredients: NormalizedMealIngredient[],
) => Promise<MealIngredient[]>;

// Function return meals which were created by current user
export type GetOwnMeals = (options?: Paginated) => Promise<Meal[]>;

type Ingridients = { ingredient: string; amount: Amount }[];
export type AddMeal = (
  meal: Omit<NormalizedMeal, 'id' | 'ingredients'> & { ingredients: Ingridients },
) => Promise<Meal>;

export type GetMealByRef = (ref: DocumentReference) => Promise<Meal>;
