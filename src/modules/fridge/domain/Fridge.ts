import type { MealIngredient, NormalizedMealIngredient } from '#/meals/domain/Meal';

export interface FridgeBase {
  id: string;
  name: string;
  userId: string;
}

export default interface Fridge extends FridgeBase {
  ingredients: MealIngredient[];
}

export interface NormalizedFridge extends FridgeBase {
  ingredients: NormalizedMealIngredient[];
}
