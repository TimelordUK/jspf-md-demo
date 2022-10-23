import { IUnderlyingInstrument } from './underlying_instrument'
import { IQuotEntryAckGrp } from './quot_entry_ack_grp'

export interface IQuotSetAckGrpNoQuoteSets {
  QuoteSetID?: string// [1] 302 (String)
  UnderlyingInstrument?: IUnderlyingInstrument// [2] UnderlyingSymbol.311, UnderlyingSymbolSfx.312 .. UnderlyingStipValue.889
  TotNoQuoteEntries?: number// [3] 304 (Int)
  LastFragment?: boolean// [4] 893 (Boolean)
  QuotEntryAckGrp?: IQuotEntryAckGrp// [5] NoQuoteEntries.295, QuoteEntryID.299 .. QuoteEntryRejectReason.368
}
