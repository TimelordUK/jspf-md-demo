import { OrderedList } from './ordered-list'
import { PriceLevel } from './price-level'
import { Order, Side } from './order'

export class OrderBook {
  constructor (public readonly symbol: string) {
  }

  static readonly toInt = 1
  public buys = new OrderedList<PriceLevel>(level => level.price * OrderBook.toInt, true)
  public sells = new OrderedList<PriceLevel>(level => level.price * OrderBook.toInt)
  public newOrder (order: Order): void {
    const set = order.side === Side.Buy ? this.buys : this.sells
    let level = set.find(order.price)
    if (level == null) {
      level = new PriceLevel(order.side, order.price)
      set.add(level)
    }
    level.add(order)
  }
}
