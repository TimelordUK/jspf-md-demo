import { IPreAllocGrpNoAllocs } from './pre_alloc_grp_no_allocs'

/*
***************
* PreAllocGrp *
***************
*/
export interface IPreAllocGrp {
  NoAllocs?: IPreAllocGrpNoAllocs[]// [1] AllocAccount.79, AllocAcctIDSource.661 .. AllocQty.80
}
