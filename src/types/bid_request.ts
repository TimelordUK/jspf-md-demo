import { IStandardHeader } from './set/standard_header'
import { IBidDescReqGrp } from './set/bid_desc_req_grp'
import { IBidCompReqGrp } from './set/bid_comp_req_grp'
import { IStandardTrailer } from './set/standard_trailer'

export interface IBidRequest {
  StandardHeader: IStandardHeader// [1] BeginString.8, BodyLength.9 .. HopRefID.630
  BidID?: string// [2] 390 (String)
  ClientBidID: string// [3] 391 (String)
  BidRequestTransType: string// [4] 374 (String)
  ListName?: string// [5] 392 (String)
  TotNoRelatedSym: number// [6] 393 (Int)
  BidType: number// [7] 394 (Int)
  NumTickets?: number// [8] 395 (Int)
  Currency?: string// [9] 15 (String)
  SideValue1?: number// [10] 396 (Float)
  SideValue2?: number// [11] 397 (Float)
  BidDescReqGrp?: IBidDescReqGrp// [12] NoBidDescriptors.398, BidDescriptorType.399 .. ValueOfFutures.408
  BidCompReqGrp?: IBidCompReqGrp// [13] NoBidComponents.420, ListID.66 .. AcctIDSource.660
  LiquidityIndType?: number// [14] 409 (Int)
  WtAverageLiquidity?: number// [15] 410 (Float)
  ExchangeForPhysical?: boolean// [16] 411 (Boolean)
  OutMainCntryUIndex?: number// [17] 412 (Float)
  CrossPercent?: number// [18] 413 (Float)
  ProgRptReqs?: number// [19] 414 (Int)
  ProgPeriodInterval?: number// [20] 415 (Int)
  IncTaxInd?: number// [21] 416 (Int)
  ForexReq?: boolean// [22] 121 (Boolean)
  NumBidders?: number// [23] 417 (Int)
  TradeDate?: Date// [24] 75 (LocalDate)
  BidTradeType: string// [25] 418 (String)
  BasisPxType: string// [26] 419 (String)
  StrikeTime?: Date// [27] 443 (UtcTimestamp)
  Text?: string// [28] 58 (String)
  EncodedTextLen?: number// [29] 354 (Length)
  EncodedText?: Buffer// [30] 355 (RawData)
  StandardTrailer: IStandardTrailer// [31] SignatureLength.93, Signature.89, CheckSum.10
}
