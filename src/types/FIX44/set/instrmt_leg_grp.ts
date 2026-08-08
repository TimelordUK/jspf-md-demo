import { IInstrmtLegGrpNoLegs } from './instrmt_leg_grp_no_legs'

/*
*****************
* InstrmtLegGrp *
*****************
*/
export interface IInstrmtLegGrp {
  NoLegs?: IInstrmtLegGrpNoLegs[]// [1] LegSymbol.600, LegSymbolSfx.601 .. LegInterestAccrualDate.956
}
