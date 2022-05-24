import { ISessionDescription, MsgType, ASessionMsgFactory, ObjectMutator } from 'jspurefix'
import { ILooseObject } from 'jspurefix/dist/collections/collection'
import { IStandardHeader } from 'jspurefix/dist/types/FIX4.4/repo'
import { inject, injectable } from 'tsyringe'

import {
  EncryptMethod,
  ILogon,
  ILogout
} from '../types/'

@injectable()
export class MsgFact extends ASessionMsgFactory {

  constructor (@inject('ISessionDescription') readonly description: ISessionDescription) {
    super(description, (_description: ISessionDescription, _type: string, o: ILooseObject) => o)
    this.isAscii = description.application.protocol === 'ascii'
  }

  public logon (): ILooseObject {
    const description = this.description
    const o: ILogon = {
      Username: description.Username,
      Password: description.Password,
      HeartBtInt: description.HeartBtInt,
      ResetSeqNumFlag: description.ResetSeqNumFlag,
      EncryptMethod: EncryptMethod.None
    } as ILogon
    return this.mutate(o, MsgType.Logon)
  }

  public logout (text: string): ILooseObject {
    const o: ILogout = {
      Text:  text
    } as ILogout
    return this.mutate(o, MsgType.Logout)
  }

  public header (msgType: string, seqNum: number, time: Date, overrideData?: Partial<IStandardHeader>): ILooseObject {
    const description = this.description
    const bodyLength: number = Math.max(4, description.BodyLengthChars || 7)
    const placeHolder = Math.pow(10, bodyLength - 1) + 1
    const o: IStandardHeader = {
      BeginString: description.BeginString,
      BodyLength: placeHolder,
      MsgType: msgType,
      SenderCompID: description.SenderCompId,
      MsgSeqNum: seqNum,
      SendingTime: time,
      TargetCompID: description.TargetCompID,
      TargetSubID: description.TargetSubID,
      ...overrideData
    }
    return this.mutate(o, 'StandardHeader')
  }
}
