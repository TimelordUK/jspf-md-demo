import { IQuotEntryAckGrpNoQuoteEntries } from './quot_entry_ack_grp_no_quote_entries'

/*
*******************
* QuotEntryAckGrp *
*******************
*/
export interface IQuotEntryAckGrp {
  NoQuoteEntries?: IQuotEntryAckGrpNoQuoteEntries[]// [1] QuoteEntryID.299, Symbol.55 .. QuoteEntryRejectReason.368
}
