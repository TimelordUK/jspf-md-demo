import { ISessionDescription, MsgType, ASessionMsgFactory } from 'jspurefix'
import { ILooseObject } from 'jspurefix/dist/collections/collection'
import { IStandardHeader } from 'jspurefix/dist/types/FIX4.4/repo'

export abstract class BaseFactoryFact extends ASessionMsgFactory {
    protected constructor (readonly description: ISessionDescription) {
        super(description, (_description: ISessionDescription, _type: string, o: ILooseObject) => o)
        this.isAscii = description?.application?.protocol === 'ascii'
    }

    public abstract logon (): ILooseObject
    public abstract logout (text: string): ILooseObject

    public header (msgType: string, seqNum: number, time: Date, overrideData?: Partial<IStandardHeader>): ILooseObject {
        const description = this.description
        const bodyLength: number = Math.max(4, description.BodyLengthChars ?? 7)
        const placeHolder = Math.pow(10, bodyLength - 1) + 1
        const o: IStandardHeader = {
            BeginString: description.BeginString,
            BodyLength: placeHolder,
            MsgType: msgType,
            SenderCompID: description.SenderCompId,
            SenderSubID: description.SenderSubID,
            MsgSeqNum: seqNum,
            SendingTime: time,
            TargetCompID: description.TargetCompID,
            TargetSubID: description.TargetSubID,
            ...overrideData
        }
        return this.mutate(o, 'StandardHeader')
    }
}