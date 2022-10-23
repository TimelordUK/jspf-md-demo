import { IStandardHeader } from './set/standard_header'
import { IStandardTrailer } from './set/standard_trailer'

export interface IBusinessMessageReject {
  StandardHeader: IStandardHeader// [1] BeginString.8, BodyLength.9 .. HopRefID.630
  RefSeqNum?: number// [2] 45 (Int)
  RefMsgType: string// [3] 372 (String)
  BusinessRejectRefID?: string// [4] 379 (String)
  BusinessRejectReason: number// [5] 380 (Int)
  Text?: string// [6] 58 (String)
  EncodedTextLen?: number// [7] 354 (Length)
  EncodedText?: Buffer// [8] 355 (RawData)
  StandardTrailer: IStandardTrailer// [9] SignatureLength.93, Signature.89, CheckSum.10
}
