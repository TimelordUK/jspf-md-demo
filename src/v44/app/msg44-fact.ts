import { ISessionDescription, MsgType } from 'jspurefix'
import { ILooseObject } from 'jspurefix/dist/collections/collection'
import { BaseFactoryFact } from '../../common/base-factory'

import {
  EncryptMethod,
  ILogon,
  ILogout
} from '../../types/FIX44'

export class Msg44Fact extends BaseFactoryFact {
  constructor (readonly description: ISessionDescription) {
    super(description)
  }

  public logon (): ILooseObject {
    const description = this.description
    const o: Partial<ILogon> = {
      Username: description.Username,
      Password: description.Password,
      HeartBtInt: description.HeartBtInt,
      ResetSeqNumFlag: description.ResetSeqNumFlag,
      EncryptMethod: EncryptMethod.None
    }
    return this.mutate(o, MsgType.Logon)
  }

  public logout (text: string): ILooseObject {
    const o: Partial<ILogout> = { Text: text }
    return this.mutate(o, MsgType.Logout)
  }
}
