import { IStandardHeader } from './set/standard_header'
import { IUserFixArchiveNoEvents } from './set/user_fix_archive_no_events'
import { IStandardTrailer } from './set/standard_trailer'

export interface IUserFixArchive {
  StandardHeader: IStandardHeader// [1] BeginString.8, BodyLength.9 .. HopRefID.630
  NoEvents: IUserFixArchiveNoEvents[]// [2] Subject.147, RawDataLength.95, RawData.96
  StandardTrailer: IStandardTrailer// [3] SignatureLength.93, Signature.89, CheckSum.10
}
