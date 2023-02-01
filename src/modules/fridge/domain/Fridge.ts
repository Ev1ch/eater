import type { MealIngredient } from '#/meals/domain/Meal';

export default interface Fridge {
  name: string;
  content: MealIngredient[];
}
