import * as events from 'events'
import { Order } from './order'
import { Dictionary } from 'jspurefix'
import { OrderBook } from './order-book'

export class MatchingEngine extends events.EventEmitter {
  public books = new Dictionary<OrderBook>()

  public newOrder (order: Order): void {
    const symbol = order.symbol
    let book = this.books.get(symbol)
    if (!book) {
      book = new OrderBook(symbol)
      this.books.addUpdate(symbol, book)
    }
    book.newOrder(order)
  }
}
