import { IParties } from './parties'
import { IPreAllocGrp } from './pre_alloc_grp'
import { ITrdgSesGrp } from './trdg_ses_grp'
import { IInstrument } from './instrument'
import { IUndInstrmtGrp } from './und_instrmt_grp'
import { IStipulations } from './stipulations'
import { IOrderQtyData } from './order_qty_data'
import { ISpreadOrBenchmarkCurveData } from './spread_or_benchmark_curve_data'
import { IYieldData } from './yield_data'
import { ICommissionData } from './commission_data'
import { IPegInstructions } from './peg_instructions'
import { IDiscretionInstructions } from './discretion_instructions'

export interface IListOrdGrpNoOrders {
  ClOrdID: string// 11
  SecondaryClOrdID?: string// 526
  ListSeqNo: number// 67
  ClOrdLinkID?: string// 583
  SettlInstMode?: string// 160
  Parties: IParties
  TradeOriginationDate?: Date// 229
  TradeDate?: Date// 75
  Account?: string// 1
  AcctIDSource?: number// 660
  AccountType?: number// 581
  DayBookingInst?: string// 589
  BookingUnit?: string// 590
  AllocID?: string// 70
  PreallocMethod?: string// 591
  PreAllocGrp: IPreAllocGrp
  SettlType?: string// 63
  SettlDate?: Date// 64
  CashMargin?: string// 544
  ClearingFeeIndicator?: string// 635
  HandlInst?: string// 21
  ExecInst?: string// 18
  MinQty?: number// 110
  MaxFloor?: number// 111
  ExDestination?: string// 100
  TrdgSesGrp: ITrdgSesGrp
  ProcessCode?: string// 81
  Instrument: IInstrument
  UndInstrmtGrp: IUndInstrmtGrp
  PrevClosePx?: number// 140
  Side: string// 54
  SideValueInd?: number// 401
  LocateReqd?: boolean// 114
  TransactTime?: Date// 60
  Stipulations: IStipulations
  QtyType?: number// 854
  OrderQtyData: IOrderQtyData
  OrdType?: string// 40
  PriceType?: number// 423
  Price?: number// 44
  StopPx?: number// 99
  SpreadOrBenchmarkCurveData: ISpreadOrBenchmarkCurveData
  YieldData: IYieldData
  Currency?: number// 15
  ComplianceID?: string// 376
  SolicitedFlag?: boolean// 377
  IOIID?: string// 23
  QuoteID?: string// 117
  TimeInForce?: string// 59
  EffectiveTime?: Date// 168
  ExpireDate?: Date// 432
  ExpireTime?: Date// 126
  GTBookingInst?: number// 427
  CommissionData: ICommissionData
  OrderCapacity?: string// 528
  OrderRestrictions?: string// 529
  CustOrderCapacity?: number// 582
  ForexReq?: boolean// 121
  SettlCurrency?: number// 120
  BookingType?: number// 775
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  SettlDate2?: Date// 193
  OrderQty2?: number// 192
  Price2?: number// 640
  PositionEffect?: string// 77
  CoveredOrUncovered?: number// 203
  MaxShow?: number// 210
  PegInstructions: IPegInstructions
  DiscretionInstructions: IDiscretionInstructions
  TargetStrategy?: number// 847
  TargetStrategyParameters?: string// 848
  ParticipationRate?: number// 849
  Designation?: string// 494
}
