import { ISettlParties } from './settl_parties'

/*
**************
* NoDlvyInst *
**************
*/
export interface IDlvyInstGrpNoDlvyInst {
  SettlInstSource?: string// [1] 165 (String)
  DlvyInstType?: string// [2] 787 (String)
  SettlParties?: ISettlParties// [3] NoSettlPartyIDs.781, SettlPartyID.782 .. SettlPartySubIDType.786
}
