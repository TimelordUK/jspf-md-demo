import { ISettlInstGrpNoSettlInst } from './settl_inst_grp_no_settl_inst'

/*
****************
* SettlInstGrp *
****************
*/
export interface ISettlInstGrp {
  NoSettlInst?: ISettlInstGrpNoSettlInst[]// [1] SettlInstID.162, SettlInstTransType.163 .. PaymentRemitterID.505
}
