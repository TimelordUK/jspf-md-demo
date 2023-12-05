import {
  IMarketDataRequest,
  IMarketDataSnapshotFullRefresh,
  MDEntryType,
  SettlType,
  SubscriptionRequestType
} from '../../types/FIX44'
import { ILooseObject } from 'jspurefix/dist/collections/collection'

export class Md44Factory {
  public News (headline: string): ILooseObject {
    return {
      Headline: headline
    }
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
            MDEntryDate: date,
            TrdRegTimestamps: {
              NoTrdRegTimestamps: []
            }
          },
          {
            MDEntryType: MDEntryType.Offer,
            MDEntryPx: price,
            MDEntrySize: 1,
            SettlType: SettlType.Regular,
            MDEntryDate: date,
            TrdRegTimestamps: {
              NoTrdRegTimestamps: []
            }
          },
          {
            MDEntryType: MDEntryType.MidPrice,
            MDEntryPx: price,
            MDEntrySize: 1,
            SettlType: SettlType.Regular,
            MDEntryDate: date,
            TrdRegTimestamps: {
              NoTrdRegTimestamps: []
            }
          }
        ]
      }
    }
  }

  public BidOfferRequest (symbol: string): Partial<IMarketDataRequest> {
    return {
      MDReqID: `#${symbol}#0#`,
      SubscriptionRequestType: SubscriptionRequestType.SnapshotPlusUpdates,
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
          // @ts-expect-error ts2307
          {
            Instrument: {
              StrikeCurrency: 'USD',
              Symbol: symbol
            }
          }
        ]
      }
    }
  }
}
