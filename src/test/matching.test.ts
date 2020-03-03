import { Order, Side } from '../book'
import { MatchingEngine } from '../book/matching-engine'

test('add new order to matcher', () => {
  const matcher = new MatchingEngine()
  const o1 = new Order(1, Side.Buy, 100.0, 100, 0, 'first')
  matcher.newOrder(o1)
  expect(matcher.buys.count()).toEqual(1)
  expect(matcher.sells.count()).toEqual(0)
  expect(matcher.buys.find(o1.price)).toBeTruthy()
  expect(matcher.buys.find(o1.price + 0.1)).toEqual(null)
  expect(matcher.buys.find(o1.price).quantity()).toEqual(o1.quantity)
})
