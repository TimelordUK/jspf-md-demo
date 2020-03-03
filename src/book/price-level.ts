import { Order, Side } from './order'
import { OrderedList } from './ordered-list'

export class PriceLevel {
  private size: number = 0
  constructor (public readonly side: Side, public readonly price: number) {
  }

  private members = new OrderedList<Order>(o => o.id)

  public quantity (): number {
    return this.size
  }

  public count (): number {
    return this.members.count()
  }

  public add (order: Order): void {
    const members = this.members
    if (order.side !== this.side) return
    const exist: Order = members.get(order.id)
    if (exist) {
      this.size -= exist.remainder
    }
    const remainder = order.remainder
    this.size += remainder
    members.remove(order)
    if (remainder > 0) {
      members.add(order)
    }
  }
}
