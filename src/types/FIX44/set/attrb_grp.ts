import { IAttrbGrpNoInstrAttrib } from './attrb_grp_no_instr_attrib'

/*
************
* AttrbGrp *
************
*/
export interface IAttrbGrp {
  NoInstrAttrib?: IAttrbGrpNoInstrAttrib[]// [1] InstrAttribType.871, InstrAttribValue.872
}
