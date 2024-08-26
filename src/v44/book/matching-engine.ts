import * as events from 'events'
import { Order } from './order'
import { OrderBook } from './order-book'

export class MatchingEngine extends events.EventEmitter {
  public books = new Map<string, OrderBook>()

  public newOrder (order: Order): void {
    const symbol = order.symbol
    let book = this.books.get(symbol)
    if (book == null) {
      book = new OrderBook(symbol)
      this.books.set(symbol, book)
    }
    book.newOrder(order)
  }
}
