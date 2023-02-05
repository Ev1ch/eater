import { getIngredientById } from '#/ingredients/service';
import type { GetMealsFromIngredients } from '#/meals/abstracts';
import { operateAmounts } from '@/modules/ingredients/domain/Amount';
import getMeals from './getMeals';

const getMealsByIngredients: GetMealsFromIngredients = async (ingredients) => {
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

  const meals = (await getMeals()).filter((meal) =>
    meal.ingredients.every(({ ingredient }) => ingredientIds.includes(ingredient.id)),
  );

  return meals.filter(({ ingredients: mealIngredients }) =>
    mealIngredients.every((i) => operateAmounts(ingredientsMap[i.ingredient.id].amount, i.amount))
  );
};

export default getMealsByIngredients;
