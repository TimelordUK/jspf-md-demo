import * as events from 'events'
import { Order } from './order'
import { Dictionary } from 'jspurefix'
import { OrderBook } from './order-book'

export class MatchingEngine extends events.EventEmitter {
  public books = new Dictionary<OrderBook>()

  public newOrder (order: Order): void {
    let book = this.books.get(order.symbol)
    if (!book) {
      book = new OrderBook(order.symbol)
      this.books.addUpdate(order.symbol, book)
    }
    book.newOrder(order)
  }
}
