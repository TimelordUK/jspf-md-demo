import { INewOrderSingle } from '../types'
import { MatchingEngine } from './matching-engine'
import { Order, Side } from './order'
import { Side as FixSide } from '../types/enum'

export class Exchange {
  private matcher: MatchingEngine = new MatchingEngine()
  public newOrder (nos: INewOrderSingle): void {
  // receive a mew order add to book
    const o = new Order(1, nos.Instrument.Symbol,
      nos.Side === FixSide.Buy ? Side.Buy : Side.Sell,
      nos.Price,
      nos.OrderQtyData.OrderQty, 0,
      nos.ClOrdID,
      nos.OrderQtyData.OrderQty,
      nos.TradeDate)
    this.matcher.newOrder(o)
  }
}
