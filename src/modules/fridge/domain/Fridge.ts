import type { MealIngredient, NormalizedMealIngredient } from '#/meals/domain/Meal';

export interface FridgeBase {
  id: string;
  name: string;
}

export default interface Fridge extends FridgeBase {
  content: MealIngredient[];
}

export interface NormalizedFridge extends FridgeBase {
  content: NormalizedMealIngredient[];
}
