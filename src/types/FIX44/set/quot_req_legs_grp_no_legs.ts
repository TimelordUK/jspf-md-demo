import { IInstrumentLeg } from './instrument_leg'
import { ILegStipulations } from './leg_stipulations'
import { INestedParties } from './nested_parties'
import { ILegBenchmarkCurveData } from './leg_benchmark_curve_data'

export interface IQuotReqLegsGrpNoLegs {
  InstrumentLeg?: IInstrumentLeg// [1] LegSymbol.600, LegSymbolSfx.601 .. LegInterestAccrualDate.956
  LegQty?: number// [2] 687 (Float)
  LegSwapType?: number// [3] 690 (Int)
  LegSettlType?: string// [4] 587 (String)
  LegSettlDate?: Date// [5] 588 (LocalDate)
  LegStipulations?: ILegStipulations// [6] NoLegStipulations.683, LegStipulationType.688, LegStipulationValue.689
  NestedParties?: INestedParties// [7] NoNestedPartyIDs.539, NestedPartyID.524 .. NestedPartySubIDType.805
  LegBenchmarkCurveData?: ILegBenchmarkCurveData// [8] LegBenchmarkCurveCurrency.676, LegBenchmarkCurveName.677 .. LegBenchmarkPriceType.680
}
