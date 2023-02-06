import { Chip } from '@/components/common';
import { AMOUNT_TYPE_TO_NAME } from '@/modules/fridge/constants';
import { MealIngredient } from '@/modules/meals/domain';

interface MealIngredientChipProps {
  ingredient: MealIngredient;
}

export default function MealIngredientChip({
  ingredient: { ingredient, amount },
}: MealIngredientChipProps) {
  return <Chip label={`${ingredient.name} ${amount.value} ${AMOUNT_TYPE_TO_NAME[amount.type]}`} />;
}
