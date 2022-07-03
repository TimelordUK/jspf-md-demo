import {
  MDEntryType,
  SettlType,
  SubscriptionRequestType,
  IMarketDataRequest,
  IMarketDataSnapshotFullRefresh,
  INews
} from '../types'
import { ILooseObject } from 'jspurefix/dist/collections/collection'

export class MDFactory {
  public static News (headline: string): ILooseObject {
    return {
      Headline: headline
    } as INews
  }

  public static FullSnapshot (symbol: string, reqId: string, price: number): ILooseObject {
    const date = new Date()
    // @ts-expect-error ts2307
    const snapshot: IMarketDataSnapshotFullRefresh = {
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
    return snapshot
  }

  public static BidOfferRequest (symbol: string): ILooseObject {
    const bor: IMarketDataRequest = {
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
    return bor
  }
}
