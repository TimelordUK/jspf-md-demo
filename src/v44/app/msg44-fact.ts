import { ISessionDescription, MsgType } from 'jspurefix'
import { ILooseObject } from 'jspurefix/dist/collections/collection'
import { BaseFactoryFact } from '../../common/base-factory'

import {
  EncryptMethod,
  ILogon,
  ILogout
} from '../../types/FIX44'

/**
 * The reason a session message factory is worth writing: this venue wants an Account
 * on the Logon, and standard FIX 4.4 has no Account on Logon.
 *
 * Two things are needed and only one of them is code:
 *
 *  1. data/FIX44-MD.xml declares `Account` on the Logon message.  Without it the
 *     encoder has no tag to write the field to and drops it - in silence before
 *     jspurefix 5.9.3, which is why this used to be so hard to diagnose.  `npm run
 *     generate` then puts it on ILogon, which is how the assignment below compiles.
 *  2. the value gets onto the message, below.
 *
 * For a value that is simply configuration, jspurefix reads a "Logon" block straight
 * out of the session description and no factory is needed at all - see
 * data/session/v44/test-initiator.json, which is where `Account` comes from here.
 * Write a factory when the value is not known until run time.
 */
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
      EncryptMethod: EncryptMethod.None,
      // whatever the description names under "Logon" ...
      ...description.Logon,
      // ... and what only run time knows.  A real venue would want a token or a
      // signature computed here; the shape is the same.
      Account: description.Logon?.Account ?? description.SenderCompId
    }
    return this.mutate(o, MsgType.Logon)
  }

  public logout (text: string): ILooseObject {
    const o: Partial<ILogout> = { Text: text }
    return this.mutate(o, MsgType.Logout)
  }
}
