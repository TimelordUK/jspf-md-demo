import { INewOrderSingle } from '../../types/FIX44'
import { MatchingEngine } from './matching-engine'
import { Order, Side } from './order'
import { Side as FixSide } from '../../types/FIX44/enum/'

export class Exchange {
  private readonly matcher: MatchingEngine = new MatchingEngine()
  public newOrder (nos: INewOrderSingle): void {
  // receive a mew order add to book
    const q = nos.OrderQtyData?.OrderQty ?? 0
    const o = new Order(1, nos.Instrument?.Symbol ?? 'me',
      nos.Side === FixSide.Buy ? Side.Buy : Side.Sell,
      nos.Price ?? 1.0,
      q, 0,
      nos.ClOrdID,
      q,
      nos.TradeDate)
    this.matcher.newOrder(o)
  }
}
