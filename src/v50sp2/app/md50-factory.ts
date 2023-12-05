import {
  IMarketDataRequest,
  IMarketDataSnapshotFullRefresh,
  INews,
  MDEntryType,
  SettlType,
  SubscriptionRequestType
} from '../../types/FIX50SP2'

export class Md50Factory {
  public News (headline: string): INews {
    return {
      Headline: headline
    } as INews
  }

  public FullSnapshot (symbol: string, reqId: string, price: number): Partial<IMarketDataSnapshotFullRefresh> {
    const date = new Date()
    return {
      MDReqID: reqId,
      Instrument: {
        SecurityID: symbol
      },
      MDFullGrp: {
        NoMDEntries: [
          {
            MDEntryType: MDEntryType.Bid,
            MDEntryPx: price,
            MDEntrySize: 1,
            SettlType: SettlType.Regular,
            MDEntryDate: date
          },
          {
            MDEntryType: MDEntryType.Offer,
            MDEntryPx: price,
            MDEntrySize: 1,
            SettlType: SettlType.Regular,
            MDEntryDate: date
          },
          {
            MDEntryType: MDEntryType.MidPrice,
            MDEntryPx: price,
            MDEntrySize: 1,
            SettlType: SettlType.Regular,
            MDEntryDate: date
          }
        ]
      }
    } as Partial<IMarketDataSnapshotFullRefresh>
  }

  public BidOfferRequest (symbol: string): Partial<IMarketDataRequest> {
    return {
      MDReqID: `#${symbol}#0#`,
      SubscriptionRequestType: SubscriptionRequestType.SnapshotAndUpdates,
      MarketDepth: 0,
      MDReqGrp: {
        NoMDEntryTypes: [
          {
            MDEntryType: MDEntryType.Bid
          },
          {
            MDEntryType: MDEntryType.Offer
          },
          {
            MDEntryType: MDEntryType.MidPrice
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
    } as Partial<IMarketDataRequest>
  }
}
