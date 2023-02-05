import type { Dispatch } from '@/store/abstracts';
import { setAreas } from '#/areas/slice';
import { areaEntity, NormalizedAreas } from '#/areas/slice/normalization';
import { setCategories } from '#/categories/slice';
import { categoryEntity, NormalizedCategories } from '#/categories/slice/normalization';
import { setIngredientTypes } from '#/ingredient-types/slice';
import { NormalizedIngredientTypes } from '#/ingredient-types/slice/normalization';
import { setIngredients } from '#/ingredients/slice';
import { ingredientEntity, NormalizedIngredients } from '#/ingredients/slice/normalization';
import { Entity } from '#/normalization/domain';
import { normalize } from '#/normalization/utils';
import { setTags } from '#/tags/slice';
import { NormalizedTags, tagEntity } from '#/tags/slice/normalization';
import type { Meal, MealIngredient, NormalizedMeal, NormalizedMealIngredient } from '../domain';

export const mealIngredientEntity = new Entity('mealIngredients', {
  ingredient: ingredientEntity,
});

export const mealEntity = new Entity('meals', {
  category: categoryEntity,
  area: areaEntity,
  ingredients: [
    {
      ingredient: ingredientEntity,
    },
  ],
  tags: [tagEntity],
});

export interface NormalizedMeals {
  [id: string]: NormalizedMeal;
}

export interface NormalizedMealIngredients {
  [id: string]: NormalizedMealIngredient;
}

export interface NormalizedEntities {
  meals: NormalizedMeals;
  areas: NormalizedAreas;
  categories: NormalizedCategories;
  ingredients: NormalizedIngredients;
  tags: NormalizedTags;
  ingredientTypes: NormalizedIngredientTypes;
}

export const normalizeMealIngredient = (dispatch: Dispatch, mealIngredient: MealIngredient) => {
  const {
    entities: { ingredients, mealIngredients },
  } = normalize<{ ingredients: NormalizedIngredients; mealIngredients: NormalizedMealIngredients }>(
    mealIngredient,
    mealIngredientEntity,
  );

  dispatch(setIngredients(ingredients));

  return mealIngredients[mealIngredient.id];
};

export const normalizeMealIngredients = (dispatch: Dispatch, mealIngredients: MealIngredient[]) => {
  const {
    entities: { ingredients, mealIngredients: normalizedMealIngredients },
  } = normalize<{ ingredients: NormalizedIngredients; mealIngredients: NormalizedMealIngredients }>(
    mealIngredients,
    [mealIngredientEntity],
  );

  dispatch(setIngredients(ingredients));

  return mealIngredients.map((mealIngredient) => normalizedMealIngredients[mealIngredient.id]);
};

export const normalizeMeal = (dispatch: Dispatch, meal: Meal) => {
  const {
    entities: { meals: normalizedMeals, areas, categories, tags, ingredients, ingredientTypes },
  } = normalize<NormalizedEntities>(meal, mealEntity);

  dispatch(setCategories(categories));
  dispatch(setAreas(areas));
  dispatch(setTags(tags));
  dispatch(setIngredients(ingredients));
  dispatch(setIngredientTypes(ingredientTypes));

  return normalizedMeals[meal.id];
};

export const normalizeMeals = (dispatch: Dispatch, meals: Meal[]) => {
  const {
    entities: { meals: normalizedMeals, areas, categories, tags, ingredients, ingredientTypes },
  } = normalize<NormalizedEntities>(meals, [mealEntity]);

  dispatch(setCategories(categories));
  dispatch(setAreas(areas));
  dispatch(setTags(tags));
  dispatch(setIngredients(ingredients));
  dispatch(setIngredientTypes(ingredientTypes));

  return meals.map((meal) => normalizedMeals[meal.id]);
};
