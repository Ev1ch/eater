import { AmountType } from '#/ingredients/domain';

export const DEFAULT_AMOUNT_TYPE = AmountType.G;

export const AMOUNT_TYPE_TO_NAME: Record<AmountType, string> = {
  [AmountType.G]: 'g',
  [AmountType.KG]: 'kg',
  [AmountType.L]: 'l',
  [AmountType.ML]: 'ml',
};
