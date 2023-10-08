import { IInstrument } from './instrument'
import { IUndInstrmtGrp } from './und_instrmt_grp'
import { IInstrmtLegGrp } from './instrmt_leg_grp'

export interface IMDIncGrpNoMDEntries {
  ApplSeqNum: number// [1] 1181 (Int)
  MDUpdateAction: string// [2] 279 (String)
  DeleteReason?: string// [3] 285 (String)
  MDEntryType?: string// [4] 269 (String)
  MDEntryID?: string// [5] 278 (String)
  MDEntryRefID?: string// [6] 280 (String)
  Instrument: IInstrument// [7] Symbol.55, SymbolSfx.65 .. InterestAccrualDate.874
  UndInstrmtGrp: IUndInstrmtGrp// [8] NoUnderlyings.711, UnderlyingSymbol.311 .. UnderlyingStipValue.889
  InstrmtLegGrp: IInstrmtLegGrp// [9] NoLegs.555, LegSymbol.600 .. LegInterestAccrualDate.956
  FinancialStatus?: string// [10] 291 (String)
  CorporateAction?: string// [11] 292 (String)
  MDEntryPx?: number// [12] 270 (Float)
  Currency?: string// [13] 15 (String)
  MDEntrySize?: number// [14] 271 (Float)
  MDEntryDate?: Date// [15] 272 (UtcDateOnly)
  MDEntryTime?: Date// [16] 273 (UtcTimeOnly)
  TickDirection?: string// [17] 274 (String)
  MDMkt?: string// [18] 275 (String)
  TradingSessionID?: string// [19] 336 (String)
  TradingSessionSubID?: string// [20] 625 (String)
  QuoteCondition?: string// [21] 276 (String)
  TradeCondition?: string// [22] 277 (String)
  MDEntryOriginator?: string// [23] 282 (String)
  LocationID?: string// [24] 283 (String)
  DeskID?: string// [25] 284 (String)
  OpenCloseSettlFlag?: string// [26] 286 (String)
  TimeInForce?: string// [27] 59 (String)
  ExpireDate?: Date// [28] 432 (LocalDate)
  ExpireTime?: Date// [29] 126 (UtcTimestamp)
  MinQty?: number// [30] 110 (Float)
  ExecInst?: string// [31] 18 (String)
  SellerDays?: number// [32] 287 (Int)
  OrderID?: string// [33] 37 (String)
  QuoteEntryID?: string// [34] 299 (String)
  MDEntryBuyer?: string// [35] 288 (String)
  MDEntrySeller?: string// [36] 289 (String)
  NumberOfOrders?: number// [37] 346 (Int)
  MDEntryPositionNo?: number// [38] 290 (Int)
  Scope?: string// [39] 546 (String)
  PriceDelta?: number// [40] 811 (Float)
  NetChgPrevDay?: number// [41] 451 (Float)
  Text?: string// [42] 58 (String)
  EncodedTextLen?: number// [43] 354 (Length)
  EncodedText?: Buffer// [44] 355 (RawData)
}