import {
  MDEntryType,
  SettlType,
  SubscriptionRequestType,
  IMarketDataRequest,
  IMarketDataSnapshotFullRefresh,
  IMDFullGrpNoMDEntries,
  IMDFullGrp,
  ITrdRegTimestamps,
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
    const date = new Date();
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
              ITrdRegTimestampsNoTrdRegTimestamps: []
            } as ITrdRegTimestamps
          } as IMDFullGrpNoMDEntries,
          {
            MDEntryType: MDEntryType.Offer,
            MDEntryPx: price,
            MDEntrySize: 1,
            SettlType: SettlType.Regular,
            MDEntryDate: date,
            TrdRegTimestamps: {
              ITrdRegTimestampsNoTrdRegTimestamps: []
            } as ITrdRegTimestamps
          } as IMDFullGrpNoMDEntries,
          {
            MDEntryType: MDEntryType.MidPrice,
            MDEntryPx: price,
            MDEntrySize: 1,
            SettlType: SettlType.Regular,
            MDEntryDate: date,
            TrdRegTimestamps: {
              ITrdRegTimestampsNoTrdRegTimestamps: []
            } as ITrdRegTimestamps
          } as IMDFullGrpNoMDEntries
        ]
      } as IMDFullGrp
    } as IMarketDataSnapshotFullRefresh
  }

  public static BidOfferRequest (symbol: string) {
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
