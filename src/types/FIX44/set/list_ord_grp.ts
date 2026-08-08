import { IListOrdGrpNoOrders } from './list_ord_grp_no_orders'

/*
**************
* ListOrdGrp *
**************
*/
export interface IListOrdGrp {
  NoOrders: IListOrdGrpNoOrders[]// [1] ClOrdID.11, SecondaryClOrdID.526 .. Designation.494
}
