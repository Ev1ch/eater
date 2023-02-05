import type { Paginated } from '#/firebase/abstracts';
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

export type AddMeal = (meal: Omit<NormalizedMeal, 'id'>) => Promise<Meal>;
