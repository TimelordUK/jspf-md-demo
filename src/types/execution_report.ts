import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { IContraGrp } from './set/contra_grp'
import { IInstrument } from './set/instrument'
import { IFinancingDetails } from './set/financing_details'
import { IUndInstrmtGrp } from './set/und_instrmt_grp'
import { IStipulations } from './set/stipulations'
import { IOrderQtyData } from './set/order_qty_data'
import { IPegInstructions } from './set/peg_instructions'
import { IDiscretionInstructions } from './set/discretion_instructions'
import { ICommissionData } from './set/commission_data'
import { ISpreadOrBenchmarkCurveData } from './set/spread_or_benchmark_curve_data'
import { IYieldData } from './set/yield_data'
import { IContAmtGrp } from './set/cont_amt_grp'
import { IInstrmtLegExecGrp } from './set/instrmt_leg_exec_grp'
import { IMiscFeesGrp } from './set/misc_fees_grp'
import { IStandardTrailer } from './set/standard_trailer'

export interface IExecutionReport {
  StandardHeader: IStandardHeader
  OrderID: string// 37
  SecondaryOrderID?: string// 198
  SecondaryClOrdID?: string// 526
  SecondaryExecID?: string// 527
  ClOrdID?: string// 11
  OrigClOrdID?: string// 41
  ClOrdLinkID?: string// 583
  QuoteRespID?: string// 693
  OrdStatusReqID?: string// 790
  MassStatusReqID?: string// 584
  TotNumReports?: number// 911
  LastRptRequested?: boolean// 912
  Parties?: IParties
  TradeOriginationDate?: Date// 229
  ContraGrp?: IContraGrp
  ListID?: string// 66
  CrossID?: string// 548
  OrigCrossID?: string// 551
  CrossType?: number// 549
  ExecID: string// 17
  ExecRefID?: string// 19
  ExecType: string// 150
  OrdStatus: string// 39
  WorkingIndicator?: boolean// 636
  OrdRejReason?: number// 103
  ExecRestatementReason?: number// 378
  Account?: string// 1
  AcctIDSource?: number// 660
  AccountType?: number// 581
  DayBookingInst?: string// 589
  BookingUnit?: string// 590
  PreallocMethod?: string// 591
  SettlType?: string// 63
  SettlDate?: Date// 64
  CashMargin?: string// 544
  ClearingFeeIndicator?: string// 635
  Instrument?: IInstrument
  FinancingDetails?: IFinancingDetails
  UndInstrmtGrp?: IUndInstrmtGrp
  Side: string// 54
  Stipulations?: IStipulations
  QtyType?: number// 854
  OrderQtyData?: IOrderQtyData
  OrdType?: string// 40
  PriceType?: number// 423
  Price?: number// 44
  StopPx?: number// 99
  PegInstructions?: IPegInstructions
  DiscretionInstructions?: IDiscretionInstructions
  PeggedPrice?: number// 839
  DiscretionPrice?: number// 845
  TargetStrategy?: number// 847
  TargetStrategyParameters?: string// 848
  ParticipationRate?: number// 849
  TargetStrategyPerformance?: number// 850
  Currency?: string// 15
  ComplianceID?: string// 376
  SolicitedFlag?: boolean// 377
  TimeInForce?: string// 59
  EffectiveTime?: Date// 168
  ExpireDate?: Date// 432
  ExpireTime?: Date// 126
  ExecInst?: string// 18
  OrderCapacity?: string// 528
  OrderRestrictions?: string// 529
  CustOrderCapacity?: number// 582
  LastQty?: number// 32
  UnderlyingLastQty?: number// 652
  LastPx?: number// 31
  UnderlyingLastPx?: number// 651
  LastParPx?: number// 669
  LastSpotRate?: number// 194
  LastForwardPoints?: number// 195
  LastMkt?: string// 30
  TradingSessionID?: string// 336
  TradingSessionSubID?: string// 625
  TimeBracket?: string// 943
  LastCapacity?: string// 29
  LeavesQty: number// 151
  CumQty: number// 14
  AvgPx: number// 6
  DayOrderQty?: number// 424
  DayCumQty?: number// 425
  DayAvgPx?: number// 426
  GTBookingInst?: number// 427
  TradeDate?: Date// 75
  TransactTime?: Date// 60
  ReportToExch?: boolean// 113
  CommissionData?: ICommissionData
  SpreadOrBenchmarkCurveData?: ISpreadOrBenchmarkCurveData
  YieldData?: IYieldData
  GrossTradeAmt?: number// 381
  NumDaysInterest?: number// 157
  ExDate?: Date// 230
  AccruedInterestRate?: number// 158
  AccruedInterestAmt?: number// 159
  InterestAtMaturity?: number// 738
  EndAccruedInterestAmt?: number// 920
  StartCash?: number// 921
  EndCash?: number// 922
  TradedFlatSwitch?: boolean// 258
  BasisFeatureDate?: Date// 259
  BasisFeaturePrice?: number// 260
  Concession?: number// 238
  TotalTakedown?: number// 237
  NetMoney?: number// 118
  SettlCurrAmt?: number// 119
  SettlCurrency?: string// 120
  SettlCurrFxRate?: number// 155
  SettlCurrFxRateCalc?: string// 156
  HandlInst?: string// 21
  MinQty?: number// 110
  MaxFloor?: number// 111
  PositionEffect?: string// 77
  MaxShow?: number// 210
  BookingType?: number// 775
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  SettlDate2?: Date// 193
  OrderQty2?: number// 192
  LastForwardPoints2?: number// 641
  MultiLegReportingType?: string// 442
  CancellationRights?: string// 480
  MoneyLaunderingStatus?: string// 481
  RegistID?: string// 513
  Designation?: string// 494
  TransBkdTime?: Date// 483
  ExecValuationPoint?: Date// 515
  ExecPriceType?: string// 484
  ExecPriceAdjustment?: number// 485
  PriorityIndicator?: number// 638
  PriceImprovement?: number// 639
  LastLiquidityInd?: number// 851
  ContAmtGrp?: IContAmtGrp
  InstrmtLegExecGrp?: IInstrmtLegExecGrp
  CopyMsgIndicator?: boolean// 797
  MiscFeesGrp?: IMiscFeesGrp
  StandardTrailer: IStandardTrailer
}
