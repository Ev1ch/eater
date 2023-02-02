import type { MealIngredient } from '#/meals/domain/Meal';

export default interface Fridge {
  id: string;
  name: string;
  content: MealIngredient[];
}
