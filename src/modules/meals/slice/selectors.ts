import { mapValues } from 'lodash';

import { selectAreas } from '#/areas/slice';
import { selectCategories } from '#/categories/slice';
import { selectIngredients } from '#/ingredients/slice';
import { selectTags } from '#/tags/slice';
import type { State } from '@/store/abstracts';
import { createSelector } from '@/store/creators';
import type { Meal } from '../domain';

export const selectNormalizedMeals = (state: State) => state.meals.entities;

export const selectNormalizedMealById = createSelector(
  [selectNormalizedMeals, (state, id: string) => id],
  (normalizedMeals, id) => normalizedMeals[id],
);

export const selectMeals = createSelector(
  [selectNormalizedMeals, selectCategories, selectAreas, selectTags, selectIngredients],
  (normalizedMeals, categories, areas, tags, ingredients) =>
    mapValues(normalizedMeals, (normalizedMeal) => {
      const category = categories[normalizedMeal.category];
      const area = areas[normalizedMeal.area];
      const mealIngredients = normalizedMeal.ingredients.map(
        ({ id: mealIngredientId, ingredient: ingredientId, amount }) => ({
          id: mealIngredientId,
          ingredient: ingredients[ingredientId],
          amount,
        }),
      );
      const mealTags = normalizedMeal.tags.map((tagId) => tags[tagId]);
      const meal = {
        ...normalizedMeal,
        category,
        area,
        ingredients: mealIngredients,
        tags: mealTags,
      } as Meal;

      return meal;
    }),
);

export const selectMealById = createSelector(
  [selectMeals, (state, id: string) => id],
  (meals, id) => meals[id],
);
