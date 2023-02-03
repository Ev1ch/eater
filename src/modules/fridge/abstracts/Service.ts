import { MealIngredient } from '@/modules/meals/domain';
import { NormalizedMealIngredient } from '@/modules/meals/domain/Meal';
import type { Fridge } from '../domain';

export type GetOwnFridge = () => Promise<Fridge>;

export type AddFridgeIngredient = (
  newIngredient: Omit<NormalizedMealIngredient, 'id'>,
) => Promise<MealIngredient>;

export type DeleteIngredientFromFridgeById = (id: string) => Promise<void>;

export type UpdateFridgeIngredientById = (
  id: string,
  updatedIngredient: Omit<NormalizedMealIngredient, 'id'>,
) => Promise<MealIngredient>;
