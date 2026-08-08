import { IPosUndInstrmtGrpNoUnderlyings } from './pos_und_instrmt_grp_no_underlyings'

/*
********************
* PosUndInstrmtGrp *
********************
*/
export interface IPosUndInstrmtGrp {
  NoUnderlyings?: IPosUndInstrmtGrpNoUnderlyings[]// [1] UnderlyingSymbol.311, UnderlyingSymbolSfx.312 .. UnderlyingSettlPriceType.733
}
