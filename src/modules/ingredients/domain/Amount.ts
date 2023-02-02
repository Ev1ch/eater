export enum AmountType {
  G,
  KG,
  L,
}

export default interface Amount {
  type: AmountType;
  value: string;
}
