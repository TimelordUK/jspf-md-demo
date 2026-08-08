import { IInstrumentLeg } from './instrument_leg'

/*
**********
* NoLegs *
**********
*/
export interface IInstrmtLegGrpNoLegs {
  InstrumentLeg?: IInstrumentLeg// [1] LegSymbol.600, LegSymbolSfx.601 .. LegInterestAccrualDate.956
}
