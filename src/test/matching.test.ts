import { Order, Side } from '../book'
import { MatchingEngine } from '../book/matching-engine'

test('add new order to matcher', () => {
  const matcher = new MatchingEngine()
  const o1 = new Order(1, 'BTC', Side.Buy, 100.0, 100, 0, 'first')
  matcher.newOrder(o1)
  const book = matcher.books.get(o1.symbol)
  expect(book).toBeTruthy()
  expect(book.buys.count()).toEqual(1)
  expect(book.sells.count()).toEqual(0)
  expect(book.buys.find(o1.price)).toBeTruthy()
  expect(book.buys.find(o1.price + 0.1)).toEqual(null)
  expect(book.buys.find(o1.price).quantity()).toEqual(o1.quantity)
})
