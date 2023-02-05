export enum AmountType {
  G = 'G',
  KG = 'KG',
  L = 'L',
  ML = 'ML',
}

export default interface Amount {
  type: AmountType;
  value: string;
}

const convertToG = (val: Amount) => {
  const num = Number.parseFloat(val.value);

  if (Number.isNaN(num)) throw new Error('Cannot conmpare NaN value');

  switch (val.type) {
    case AmountType.KG:
    case AmountType.L:
      return 1000 * num;
    case AmountType.G:
    case AmountType.ML:
    default:
      return num;
  }
};

type CompareOperator = '>' | '>=' | '<' | '<=' | '==';
type MathOperator = '+' | '-' | '*' | '/';

export const operateAmounts = (a: Amount, b: Amount, operator: CompareOperator | MathOperator = '>=') => {
  const v1 = convertToG(a);
  const v2 = convertToG(b);

  switch (operator) {
    case '>':
      return v1 > v2;
    case '>=':
      return v1 >= v2;
    case '<':
      return v1 < v2;
    case '<=':
      return v1 <= v2;
    case '==':
      return v1 === v2;
    case '*':
      return v1 * v2;
    case '/':
      return v1 / v2;
    case '-':
      return v1 - v2;
    case '+':
      return v1 + v2;
    default:
      throw new Error('Not allowed operator');
  }
};

export const amountMultiplier: Record<AmountType, number> = {
  [AmountType.G]: 1,
  [AmountType.KG]: 1000,
  [AmountType.ML]: 1,
  [AmountType.L]: 1000,
};
