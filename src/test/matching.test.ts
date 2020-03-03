import { Order, Side } from '../book'
import { MatchingEngine } from '../book/matching-engine'

test('add new order to matcher', () => {
  const matcher = new MatchingEngine()
  const o1 = new Order(1, Side.Buy, 100.0, 100, 0, 'first')
  matcher.newOrder(o1)
})
