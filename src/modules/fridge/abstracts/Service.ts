import { MealIngredient } from '@/modules/meals/domain';
import { NormalizedMealIngredient } from '@/modules/meals/domain/Meal';
import { User } from '@/modules/user/domain';
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

export type CheckFridgeExist = (user?: User) => Promise<boolean>;

export type CreateEmptyFridge = (user?: User) => Promise<void>;
