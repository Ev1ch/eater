import type { ResponseMeal } from './abstract';
import type { Meal } from './domain';

export default function mapToMeal(responseMeal: ResponseMeal): Meal {
  return { id: responseMeal.id };
}
