import {
  MDEntryType,
  SettlType,
  SubscriptionRequestType,
  IMarketDataRequest,
  IMarketDataSnapshotFullRefresh,
  INews
} from '../../types/FIX50SP2'
import { ILooseObject } from 'jspurefix/dist/collections/collection'

export class Md50Factory {
  public News (headline: string): ILooseObject {
    // @ts-expect-error ts2307
    const o: INews = {
      Headline: headline
    }
    return o
  }

  public FullSnapshot (symbol: string, reqId: string, price: number): ILooseObject {
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
    }
    return snapshot
  }

  public BidOfferRequest (symbol: string): ILooseObject {
    // @ts-expect-error ts2307
    const bor: IMarketDataRequest = {
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
    }
    return bor
  }
}
