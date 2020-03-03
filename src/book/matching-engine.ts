import * as events from 'events'
import { PriceLevel } from './price-level'
import { OrderedList } from './ordered-list'
import { Order, Side } from './order'

export class MatchingEngine extends events.EventEmitter {
  static readonly toInt = 1
  public buys = new OrderedList<PriceLevel>(level => level.price * MatchingEngine.toInt, true)
  public sells = new OrderedList<PriceLevel>(level => level.price * MatchingEngine.toInt)
  public newOrder (order: Order): void {
    const set = order.side === Side.Buy ? this.buys : this.sells
    let level = set.find(order.price)
    if (!level) {
      level = new PriceLevel(order.side, order.price)
      set.add(level)
    }
    level.add(order)
  }
}
