import { ITrdCollGrpNoTrades } from './trd_coll_grp_no_trades'

/*
**************
* TrdCollGrp *
**************
*/
export interface ITrdCollGrp {
  NoTrades?: ITrdCollGrpNoTrades[]// [1] TradeReportID.571, SecondaryTradeReportID.818
}
