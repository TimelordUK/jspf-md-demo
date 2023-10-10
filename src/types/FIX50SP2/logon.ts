import { IStandardHeader } from './set/standard_header'
import { ILogonNoMsgTypes } from './set/logon_no_msg_types'
import { IStandardTrailer } from './set/standard_trailer'

export interface ILogon {
  StandardHeader: IStandardHeader// [1] BeginString.8, BodyLength.9 .. HopRefID.630
  EncryptMethod: number// [2] 98 (Int)
  HeartBtInt: number// [3] 108 (Int)
  RawDataLength?: number// [4] 95 (Length)
  RawData?: Buffer// [5] 96 (RawData)
  ResetSeqNumFlag?: boolean// [6] 141 (Boolean)
  NextExpectedMsgSeqNum?: number// [7] 789 (Int)
  MaxMessageSize?: number// [8] 383 (Length)
  NoMsgTypes?: ILogonNoMsgTypes[]// [9] RefMsgType.372, MsgDirection.385
  DefaultApplVerID: string// [10] 1137 (String)
  TestMessageIndicator?: boolean// [11] 464 (Boolean)
  Username?: string// [12] 553 (String)
  Password?: string// [13] 554 (String)
  NewPassword?: string// [14] 925 (String)
  EncryptedPasswordMethod?: number// [15] 1400 (Int)
  EncryptedPasswordLen?: number// [16] 1401 (Length)
  EncryptedPassword?: Buffer// [17] 1402 (RawData)
  EncryptedNewPasswordLen?: number// [18] 1403 (Length)
  EncryptedNewPassword?: Buffer// [19] 1404 (RawData)
  SessionStatus?: number// [20] 1409 (Int)
  DefaultApplVerID?: string// [21] 1137 (String)
  DefaultApplExtID?: number// [22] 1407 (Int)
  DefaultCstmApplVerID?: string// [23] 1408 (String)
  Text?: string// [24] 58 (String)
  EncodedTextLen?: number// [25] 354 (Length)
  EncodedText?: Buffer// [26] 355 (RawData)
  StandardTrailer: IStandardTrailer// [27] SignatureLength.93, Signature.89, CheckSum.10
}
