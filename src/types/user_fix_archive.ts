import { IStandardHeader } from './set/standard_header'
import { IUserFixArchiveNoEvents } from './set/user_fix_archive_no_events'
import { IStandardTrailer } from './set/standard_trailer'

export interface IUserFixArchive {
  StandardHeader: IStandardHeader
  NoEvents: IUserFixArchiveNoEvents[]
  StandardTrailer: IStandardTrailer
}
