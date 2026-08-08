import { IAffectedOrdGrpNoAffectedOrders } from './affected_ord_grp_no_affected_orders'

/*
******************
* AffectedOrdGrp *
******************
*/
export interface IAffectedOrdGrp {
  NoAffectedOrders?: IAffectedOrdGrpNoAffectedOrders[]// [1] OrigClOrdID.41, AffectedOrderID.535, AffectedSecondaryOrderID.536
}
