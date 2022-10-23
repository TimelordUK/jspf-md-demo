import { IInstrumentLeg } from './instrument_leg'
import { ILegStipulations } from './leg_stipulations'
import { ILegPreAllocGrp } from './leg_pre_alloc_grp'
import { INestedParties } from './nested_parties'

export interface ILegOrdGrpNoLegs {
  InstrumentLeg: IInstrumentLeg// [1] LegSymbol.600, LegSymbolSfx.601 .. LegInterestAccrualDate.956
  LegQty?: number// [2] 687 (Float)
  LegSwapType?: number// [3] 690 (Int)
  LegStipulations: ILegStipulations// [4] NoLegStipulations.683, LegStipulationType.688, LegStipulationValue.689
  LegPreAllocGrp: ILegPreAllocGrp// [5] NoLegAllocs.670, LegAllocAccount.671 .. LegSettlCurrency.675
  LegPositionEffect?: string// [6] 564 (String)
  LegCoveredOrUncovered?: number// [7] 565 (Int)
  NestedParties: INestedParties// [8] NoNestedPartyIDs.539, NestedPartyID.524 .. NestedPartySubIDType.805
  LegRefID?: string// [9] 654 (String)
  LegPrice?: number// [10] 566 (Float)
  LegSettlType?: string// [11] 587 (String)
  LegSettlDate?: Date// [12] 588 (LocalDate)
}
