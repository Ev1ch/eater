export enum AmountType {
  G = 'G',
  KG = 'KG',
  L = 'L',
}

export default interface Amount {
  type: AmountType;
  value: string;
}
