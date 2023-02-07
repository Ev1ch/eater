/* eslint-disable no-cond-assign */
/* eslint-disable no-await-in-loop */
import { getIngredientById } from '#/ingredients/service';
import type { GetMealsFromIngredients } from '#/meals/abstracts';
import { operateAmounts } from '@/modules/ingredients/domain/Amount';
import { Meal } from '../domain';
import getMeals from './getMeals';

const getMealsByIngredients: GetMealsFromIngredients = async (ingredients, options = {}) => {
  if (ingredients.length === 0) {
    return [];
  }

  const ingredientsDb = await Promise.all(
    ingredients.map(async (i) => ({
      ...i,
      ingredient: await getIngredientById(i.ingredient),
    })),
  );
  const ingredientsMap: Record<string, (typeof ingredientsDb)[number]> = ingredientsDb.reduce(
    (acc, curr) => ({ ...acc, [curr.ingredient.id]: curr }),
    {},
  );
  const ingredientIds = Object.keys(ingredientsMap);
  const { page } = options;

  function filterMeals(meals: Meal[] = []) {
    return meals
      .filter((meal) =>
        meal.ingredients.every(({ ingredient }) => ingredientIds.includes(ingredient.id)),
      )
      .filter(({ ingredients: mealIngredients }) =>
        mealIngredients.every((i) =>
          operateAmounts(ingredientsMap[i.ingredient.id].amount, i.amount),
        ),
      );
  }

  let lastId = page?.lastId;

  if (page?.size) {
    const res: Meal[] = [];
    while (res.length !== page.size) {
      const meals = await getMeals({
        page: {
          size: 20,
          lastId,
        },
      });
      const filtered = filterMeals(meals);

      lastId = meals[meals.length - 1]?.id;
      if (filtered.length) {
        let addingCounter = 0;
        while (res.length !== page.size) {
          res.push(filtered[addingCounter]);
          addingCounter += 1;
        }
      }
    }

    return res.filter((r) => r);
  }
  const meals = await getMeals();

  return filterMeals(meals);
};

export default getMealsByIngredients;
