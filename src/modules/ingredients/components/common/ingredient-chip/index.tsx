import { Chip } from '@/components/common';
import { Ingredient } from '#/ingredients/domain';

interface IIngredientChipProps {
  ingredient: Ingredient;
}

export default function IngredientChip({ ingredient }: IIngredientChipProps) {
  return <Chip label={ingredient.name} />;
}
