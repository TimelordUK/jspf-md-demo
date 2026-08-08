import { IDlvyInstGrpNoDlvyInst } from './dlvy_inst_grp_no_dlvy_inst'

/*
***************
* DlvyInstGrp *
***************
*/
export interface IDlvyInstGrp {
  NoDlvyInst?: IDlvyInstGrpNoDlvyInst[]// [1] SettlInstSource.165, DlvyInstType.787 .. SettlPartySubIDType.786
}
