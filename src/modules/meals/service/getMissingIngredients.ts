import { getIngredientById } from '#/ingredients/service';
import type { GetMissingIngredients } from '#/meals/abstracts';
import { amountMultiplier, operateAmounts } from '@/modules/ingredients/domain/Amount';
import { MealIngredient } from '../domain';

const getMissingIngredients: GetMissingIngredients = async (meal, ingredients) => {
  const mealIngredients = meal.ingredients;
  // ingredients needed to cook
  const mealIngredientsDb = await Promise.all(
    mealIngredients.map(async (i) => ({
      ...i,
      ingredient: await getIngredientById(i.ingredient),
    })),
  );

  // ingredients that user has
  const fridgeIngredientsDb = await Promise.all(
    ingredients.map(async (i) => ({
      ...i,
      ingredient: await getIngredientById(i.ingredient),
    })),
  );
  const fridgeIngredientsMap: Record<string, (typeof fridgeIngredientsDb)[number]> =
    fridgeIngredientsDb.reduce(
      (acc, curr) => ({ ...acc, [curr.ingredient.id]: curr }),
      {},
    );
  const fridgeIngredientIds = Object.keys(fridgeIngredientsMap);

  // difference
  const diff: MealIngredient[] = [];

  // eslint-disable-next-line consistent-return
  mealIngredientsDb.forEach((ing) => {
    // ingridients user don't have at all
    if (!fridgeIngredientIds.includes(ing.ingredient.id)) {
      return diff.push(ing);
    }
    // ingridients user have partly
    const diffAmount = operateAmounts(ing.amount, fridgeIngredientsMap[ing.ingredient.id].amount, '-');
    if (diffAmount > 0) {
      const amountType = ing.amount.type;
      const multiplier = amountMultiplier[amountType];
      diff.push({
        ...ing,
        amount: {
          type: amountType,
          value: (Number(diffAmount) / multiplier).toFixed(2),
        },
      });
    }
  });

  return diff;
};

export default getMissingIngredients;
