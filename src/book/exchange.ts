import { INewOrderSingle } from '../types'
import { MatchingEngine } from './matching-engine'

export class Exchange {
  private matcher: MatchingEngine = new MatchingEngine()
  public newOrder (nos: INewOrderSingle): void {
  // receive a mew order add to book
  }
}
