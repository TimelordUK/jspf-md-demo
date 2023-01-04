import 'reflect-metadata'

import { Exchange, Order, Side } from '../book'
import { MatchingEngine } from '../book/matching-engine'
import { INewOrderSingle, OrdType, OrderCapacity, TimeInForce, Side as FixSide, CustOrderCapacity } from '../types'

test('add new order to matcher', () => {
  const matcher = new MatchingEngine()
  const o1 = new Order(1, 'BTC', Side.Buy, 100.0, 100, 0, 'first')
  matcher.newOrder(o1)
  const book = matcher.books.get(o1.symbol)
  expect(book).toBeTruthy()
  expect(book?.buys.count()).toEqual(1)
  expect(book?.sells.count()).toEqual(0)
  expect(book?.buys.find(o1.price)).toBeTruthy()
  expect(book?.buys.find(o1.price + 0.1)).toEqual(null)
  expect(book?.buys.find(o1.price)?.quantity()).toEqual(o1.quantity)
})

test('enter NewOrderSingle to exchange', () => {
  // @ts-expect-error ts2307
  const o1: INewOrderSingle = {
    ClOrdID: 'Order184946',
    Account: '2F8QNWXP2',
    Instrument: {
      Symbol: 'COSP:BTC/USD'
    },
    Side: FixSide.Buy,
    TransactTime: new Date('2019-04-02T14:22:27.000Z'),
    OrderQtyData: {
      OrderQty: 5
    },
    OrdType: OrdType.Limit,
    Price: 7300,
    TimeInForce: TimeInForce.Day,
    OrderCapacity: OrderCapacity.Agency,
    CustOrderCapacity: CustOrderCapacity.MemberTradingForTheirOwnAccount
  }
  const exchange = new Exchange()
  exchange.newOrder(o1)
})
