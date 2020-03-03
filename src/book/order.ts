export enum Side {
  Buy = 1,
  Sell
}

export class Order {
  constructor (
    public readonly id: number,
    public readonly side: Side,
    public readonly price: number,
    public readonly quantity: number,
    public readonly done: number,
    public readonly clOrdID: string,
    public readonly remainder: number = quantity - done,
    public readonly createTime: Date = new Date()) {
  }
}
