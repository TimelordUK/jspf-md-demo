import { IUndInstrmtGrpNoUnderlyings } from './und_instrmt_grp_no_underlyings'

/*
*****************
* UndInstrmtGrp *
*****************
*/
export interface IUndInstrmtGrp {
  NoUnderlyings?: IUndInstrmtGrpNoUnderlyings[]// [1] UnderlyingSymbol.311, UnderlyingSymbolSfx.312 .. UnderlyingStipValue.889
}
