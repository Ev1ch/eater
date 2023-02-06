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

export const selectMealsOrders = (state: State) => state.meals.orders;

export const selectCanBeCookedOrder = createSelector(
  [selectMealsOrders],
  (orders) => orders.canBeCooked,
);

export const selectLatestOrder = createSelector([selectMealsOrders], (orders) => orders.latest);

export const selectCanBeCookedNormalizedPages = createSelector(
  [selectCanBeCookedOrder],
  (order) => order.pages,
);

export const selectLatestNormalizedPages = createSelector(
  [selectLatestOrder],
  (order) => order.pages,
);

export const selectCanBeCookedPages = createSelector(
  [selectMeals, selectCanBeCookedNormalizedPages],
  (meals, pages) =>
    pages.map(({ meals: currentMeals }) => ({
      meals: currentMeals.map((meal) => meals[meal]),
    })),
);

export const selectLatestPages = createSelector(
  [selectMeals, selectLatestNormalizedPages],
  (meals, pages) =>
    pages.map(({ meals: currentMeals }) => ({
      meals: currentMeals.map((meal) => meals[meal]),
    })),
);

export const selectCanBeCookedOptions = createSelector(
  [selectCanBeCookedOrder],
  (order) => order.options,
);

export const selectLatestOptions = createSelector([selectLatestOrder], (order) => order.options);

export const selectCanBeCookedPageSize = createSelector(
  [selectCanBeCookedOptions],
  (options) => options.page.size,
);

export const selectLatestPageSize = createSelector(
  [selectLatestOptions],
  (options) => options.page.size,
);

export const selectCanBeCookedCurrentPageIndex = createSelector(
  [selectCanBeCookedOptions],
  (options) => options.page.index,
);

export const selectLatestCurrentPageIndex = createSelector(
  [selectLatestOptions],
  (options) => options.page.index,
);

export const selectCanBeCookedCurrentPage = createSelector(
  [selectCanBeCookedPages, selectCanBeCookedCurrentPageIndex],
  (pages, index) => pages[index - 1],
);

export const selectLatestCurrentPage = createSelector(
  [selectLatestPages, selectLatestCurrentPageIndex],
  (pages, index) => pages[index - 1],
);

export const selectAllCanBeCookedPagesToCurrent = createSelector(
  [selectCanBeCookedPages, selectCanBeCookedCurrentPageIndex],
  (pages, index) => pages.slice(0, index),
);

export const selectAllLatestPagesToCurrent = createSelector(
  [selectLatestPages, selectLatestCurrentPageIndex],
  (pages, index) => pages.slice(0, index),
);

export const selectCanBeCookedHasMore = createSelector(
  [selectCanBeCookedNormalizedPages, selectCanBeCookedPageSize],
  (pages, size) => {
    if (!pages.length) {
      return true;
    }

    return pages.at(-1)!.meals.length === size;
  },
);

export const selectLatestHasMore = createSelector(
  [selectCanBeCookedNormalizedPages, selectLatestPageSize],
  (pages, size) => {
    if (!pages.length) {
      return true;
    }

    return pages.at(-1)!.meals.length === size;
  },
);
