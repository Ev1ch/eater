export enum AmountType {
  G = 'g',
  KG = 'kg',
  L = 'l',
}

export default interface Amount {
  type: AmountType;
  value: string;
}
