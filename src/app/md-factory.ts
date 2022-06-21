import {
  MDEntryType,
  SettlType,
  SubscriptionRequestType,
  IMarketDataRequest,
  IMarketDataSnapshotFullRefresh,
  IMDFullGrpNoMDEntries, IMDFullGrp, ITrdRegTimestampsNoTrdRegTimestamps, ITrdRegTimestamps
} from '../types'
import { ILooseObject } from 'jspurefix/dist/collections/collection'

export class MDFactory {

  public static FullSnapshot (symbol: string): ILooseObject {
    const date = new Date(2022, 5, 23, 0, 0, 0)
    return {
      MDReqID: `#${symbol}#0#`, // #GBPUSD#0#
      Instrument: {
        SecurityID: symbol
      },
      MDFullGrp: {
        NoMDEntries: [
          {
            MDEntryType: MDEntryType.Bid,
            MDEntryPx: 1.22759,
            MDEntrySize: 1,
            SettlType: SettlType.Regular,
            MDEntryDate: date,
            TrdRegTimestamps: {
              ITrdRegTimestampsNoTrdRegTimestamps: []
            } as ITrdRegTimestamps
          } as IMDFullGrpNoMDEntries,
          {
            MDEntryType: MDEntryType.Offer,
            MDEntryPx: 1.22759,
            MDEntrySize: 1,
            SettlType: SettlType.Regular,
            MDEntryDate: date,
            TrdRegTimestamps: {
              ITrdRegTimestampsNoTrdRegTimestamps: []
            } as ITrdRegTimestamps
          } as IMDFullGrpNoMDEntries,
          {
            MDEntryType: MDEntryType.MidPrice,
            MDEntryPx: 1.22759,
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
