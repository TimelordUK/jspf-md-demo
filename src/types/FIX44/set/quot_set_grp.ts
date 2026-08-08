import { IQuotSetGrpNoQuoteSets } from './quot_set_grp_no_quote_sets'

/*
**************
* QuotSetGrp *
**************
*/
export interface IQuotSetGrp {
  NoQuoteSets: IQuotSetGrpNoQuoteSets[]// [1] QuoteSetID.302, UnderlyingSymbol.311 .. Currency.15
}
