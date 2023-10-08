import { ISessionDescription, MsgType } from 'jspurefix'
import { ILooseObject } from 'jspurefix/dist/collections/collection'


import {
  EncryptMethod,
  ILogon,
  ILogout
} from '../../types/FIX50SP2'
import {BaseFactoryFact} from "../../common/base-factory";

export class Msg50Fact extends BaseFactoryFact {
  constructor (readonly description: ISessionDescription) {
    super(description)
  }

  public logon (): ILooseObject {
    const description = this.description
    // @ts-expect-error ts2307
    const o: ILogon = {
      Username: description.Username,
      Password: description.Password,
      HeartBtInt: description.HeartBtInt,
      ResetSeqNumFlag: description.ResetSeqNumFlag,
      EncryptMethod: EncryptMethod.None
    }
    return this.mutate(o, MsgType.Logon)
  }

  public logout (text: string): ILooseObject {
    // @ts-expect-error ts2307
    const o: ILogout = { Text: text }
    return this.mutate(o, MsgType.Logout)
  }
}
