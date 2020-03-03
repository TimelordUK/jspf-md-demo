import { Order, OrderedList, Side } from '../book'

/*
export class Order {
  constructor (
    public readonly id: number,
    public readonly side: Side,
    public readonly price: number,
    public readonly quantity: number,
    public readonly done: number,
    public readonly clOrdID: string,
    public readonly remainder: number = quantity - done,
    public readonly createTime: Date = new Date()) {
  }
 */

function list5 () {
  const test = new OrderedList<Order>(o => o.id)
  const o1 = new Order(1, Side.Buy, 100.0, 100, 0, 'first')
  const o2 = new Order(2, Side.Buy, 100.0, 100, 0, 'second')
  const o3 = new Order(3, Side.Buy, 100.0, 100, 0, 'third')
  const o4 = new Order(4, Side.Buy, 100.0, 100, 0, 'fourth')
  const o5 = new Order(5, Side.Buy, 100.0, 100, 0, 'fifth')
  test.add(o3)
  test.add(o1)
  test.add(o4)
  test.add(o2)
  test.add(o5)
  return test
}

test('add first element to order list', () => {
  const test = new OrderedList<Order>(o => o.id)
  const o = new Order(1, Side.Buy, 100.0, 100, 0, 'first')
  test.add(o)
  expect(test.count()).toEqual(1)
  expect(test.get(0)).toBeTruthy()
  expect(test.get(1)).toEqual(undefined)
})

test('add 3 unordered expect ordered', () => {
  const test = new OrderedList<Order>(o => o.id)
  const o1 = new Order(1, Side.Buy, 100.0, 100, 0, 'first')
  const o2 = new Order(2, Side.Buy, 100.0, 100, 0, 'second')
  const o3 = new Order(3, Side.Buy, 100.0, 100, 0, 'third')
  test.add(o3)
  test.add(o2)
  test.add(o1)
  expect(test.count()).toEqual(3)
  expect(test.get(0).id).toEqual(1)
  expect(test.get(1).id).toEqual(2)
  expect(test.get(2).id).toEqual(3)
})

test('add 5 unordered expect ordered', () => {
  const test = list5()

  expect(test.count()).toEqual(5)
  expect(test.get(0).id).toEqual(1)
  expect(test.get(1).id).toEqual(2)
  expect(test.get(2).id).toEqual(3)
  expect(test.get(3).id).toEqual(4)
  expect(test.get(4).id).toEqual(5)
  expect(test.peek().id).toEqual(5)

  expect(test.exists(test.get(0))).toEqual(true)
  expect(test.exists(test.get(1))).toEqual(true)
  expect(test.exists(test.get(2))).toEqual(true)
  expect(test.exists(test.get(3))).toEqual(true)
  expect(test.exists(test.get(4))).toEqual(true)
})

test('add to list of 5', () => {
  const test = list5()
  const o6 = new Order(6, Side.Buy, 100.0, 100, 0, 'sixth')
  expect(test.exists(o6)).toEqual(false)
  test.add(o6)
  expect(test.exists(o6)).toEqual(true)
  expect(test.count()).toEqual(6)
})

test('remove from list of 5', () => {
  const test = list5()
  const o3 = test.get(2)
  expect(test.remove(o3)).toEqual(true)
  expect(test.exists(o3)).toEqual(false)
  expect(test.count()).toEqual(4)
})

function pricesLowestToHighest (n1: number, n2: number, n3: number, n4: number, n5: number): OrderedList<number> {
  const test = new OrderedList<number>(o => o * 1000000)
  test.add(n1)
  test.add(n2)
  test.add(n3)
  test.add(n4)
  test.add(n5)
  return test
}

function pricesHighestToLowest (n1: number, n2: number, n3: number, n4: number, n5: number): OrderedList<number> {
  const test = new OrderedList<number>(o => o * 1000000, true)
  test.add(n1)
  test.add(n2)
  test.add(n3)
  test.add(n4)
  test.add(n5)
  return test
}

test('bids descending', () => {
  const test = pricesHighestToLowest(100.1, 100.3, 100.2, 100.5, 100.0)

  expect(test.count()).toEqual(5)
  expect(test.get(0)).toEqual(100.5)
  expect(test.get(1)).toEqual(100.3)
  expect(test.get(2)).toEqual(100.2)
  expect(test.get(3)).toEqual(100.1)
  expect(test.get(4)).toEqual(100.0)
  expect(test.top()).toEqual(100.5)
})

test('asks ascending', () => {
  const test = pricesLowestToHighest(101.0, 100.9, 100.8, 100.7, 100.6)

  expect(test.count()).toEqual(5)
  expect(test.get(0)).toEqual(100.6)
  expect(test.get(1)).toEqual(100.7)
  expect(test.get(2)).toEqual(100.8)
  expect(test.get(3)).toEqual(100.9)
  expect(test.get(4)).toEqual(101.0)
  expect(test.top()).toEqual(100.6)
})

test('bids asks', () => {
  const bids = pricesHighestToLowest(100.1, 100.3, 100.2, 100.5, 100.0)
  const asks = pricesLowestToHighest(101.0, 100.9, 100.8, 100.7, 100.6)
  const bestBid = bids.top()
  const bestOffer = asks.top()
  expect(bestBid).toEqual(100.5)
  expect(bestOffer).toEqual(100.6)
})

test('find in ordered', () => {
  const test = list5()
  expect(test.count()).toEqual(5)
  const e = test.find(1)
  expect(e).toBeTruthy()
  expect(e.id).toEqual(1)

  const e3 = test.find(3)
  expect(e3).toBeTruthy()
  expect(e3.id).toEqual(3)

  const e10 = test.find(10)
  expect(e10).toEqual(null)
})
