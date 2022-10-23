import { IStandardHeader } from './set/standard_header'
import { ISecListGrp } from './set/sec_list_grp'
import { IStandardTrailer } from './set/standard_trailer'

export interface ISecurityList {
  StandardHeader: IStandardHeader// [1] BeginString.8, BodyLength.9 .. HopRefID.630
  SecurityReqID: string// [2] 320 (String)
  SecurityResponseID: string// [3] 322 (String)
  SecurityRequestResult: number// [4] 560 (Int)
  TotNoRelatedSym?: number// [5] 393 (Int)
  LastFragment?: boolean// [6] 893 (Boolean)
  SecListGrp?: ISecListGrp// [7] NoRelatedSym.146, Symbol.55 .. EncodedText.355
  StandardTrailer: IStandardTrailer// [8] SignatureLength.93, Signature.89, CheckSum.10
}
