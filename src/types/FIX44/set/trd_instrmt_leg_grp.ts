import { ITrdInstrmtLegGrpNoLegs } from './trd_instrmt_leg_grp_no_legs'

/*
********************
* TrdInstrmtLegGrp *
********************
*/
export interface ITrdInstrmtLegGrp {
  NoLegs?: ITrdInstrmtLegGrpNoLegs[]// [1] LegSymbol.600, LegSymbolSfx.601 .. LegLastPx.637
}
