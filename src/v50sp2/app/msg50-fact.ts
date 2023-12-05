import { MsgType } from 'jspurefix'
import { ILooseObject } from 'jspurefix/dist/collections/collection'

import {
  EncryptMethod,
  ILogon,
  ILogout
} from '../../types/FIX50SP2'
import { BaseFactoryFact } from '../../common/base-factory'
import { IMd50Description } from '../../../dist/v50sp2/app/md50-description'

export class Msg50Fact extends BaseFactoryFact {
  constructor (readonly description: IMd50Description) {
    super(description)
  }

  public logon (): ILooseObject {
    const description = this.description
    const o: Partial<ILogon> = {
      Username: description.Username,
      Password: description.Password,
      HeartBtInt: description.HeartBtInt,
      ResetSeqNumFlag: description.ResetSeqNumFlag,
      EncryptMethod: EncryptMethod.None,
      DefaultApplVerID: description.DefaultApplVerID
    }
    return this.mutate(o, MsgType.Logon)
  }

  public logout (text: string): ILooseObject {
    // @ts-expect-error ts2307
    const o: ILogout = { Text: text }
    return this.mutate(o, MsgType.Logout)
  }
}
