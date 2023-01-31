import type { ResponseIngredient } from './abstract';
import type { Ingredient } from './domain';

export default function mapToIngredient(responseIngredient: ResponseIngredient): Ingredient {
  return { id: responseIngredient.id };
}
