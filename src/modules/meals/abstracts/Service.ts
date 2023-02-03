import type { Paginated } from '#/firebase/abstracts';
import type { Meal, MealIngredient } from '../domain';

export type GetMeals = (options?: Paginated) => Promise<Meal[]>;

export type GetMealsFromIngredients = (
  ingredients: MealIngredient[],
  options?: Paginated,
) => Promise<Meal[]>;

// Function return meals which were created by current user
export type GetOwnMeals = (options?: Paginated) => Promise<Meal[]>;

export type AddMeal = (meal: Omit<Meal, 'id'>) => Promise<Meal>;
