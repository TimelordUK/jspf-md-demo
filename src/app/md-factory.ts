import { MDEntryType, SubscriptionRequestType } from '../types/enum'
import { IMarketDataRequest } from '../types'

export class MDFactory {
  public static BidOfferRequest (symbol: string) {
    return {
      MDReqID: '1',
      SubscriptionRequestType: SubscriptionRequestType.SnapshotPlusUpdates,
      MarketDepth: 0,
      MDReqGrp: {
        NoMDEntryTypes: [
          {
            MDEntryType: MDEntryType.Bid
          },
          {
            MDEntryType: MDEntryType.Offer
          }
        ]
      },
      InstrmtMDReqGrp: {
        NoRelatedSym: [
          {
            Instrument: {
              StrikeCurrency: 'USD',
              Symbol: symbol
            }
          }
        ]
      }
    } as IMarketDataRequest
  }
}
