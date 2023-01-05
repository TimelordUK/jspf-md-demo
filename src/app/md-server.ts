import { AsciiSession, MsgView, IJsFixConfig, IJsFixLogger } from 'jspurefix'
import { IMarketDataRequest, IUserFixArchive, IUserFixArchiveNoEvents, MsgType } from '../types'
import { inject, injectable } from 'tsyringe'
import { MDFactory } from './md-factory'

// interfaces generated by compiler to make messages easy in an IDE

@injectable()
export class MDServer extends AsciiSession {
  private readonly logger: IJsFixLogger
  private readonly fixLog: IJsFixLogger
  private readonly mdFactory: MDFactory = new MDFactory()

  constructor (@inject('IJsFixConfig') public readonly config: IJsFixConfig) {
    super(config)
    this.logReceivedMsgs = true
    this.checkMsgIntegrity = false
    this.logger = config.logFactory.logger(`${this.me}:MDServer`)
    const name = config?.description?.application?.name ?? ''
    this.fixLog = config.logFactory.plain(`jsfix.${name}.txt`)
  }

  protected onApplicationMsg (msgType: string, view: MsgView): void {
    this.logger.info(`${view.toJson()}`)
    switch (msgType) {
      case MsgType.MarketDataRequest: {
        this.marketDataRequest(view)
        break
      }

      case MsgType.UserFixArchive: {
        this.userFixArchive(view)
        break
      }

      default: {
        this.logger.info(`unknown msgType ${msgType}`)
        break
      }
    }
  }

  private marketDataRequest (view: MsgView): void {
    const req: IMarketDataRequest = view.toObject()
    const symbol: string = req?.InstrmtMDReqGrp?.NoRelatedSym[0].Instrument.Symbol ?? ''
    const id = req.MDReqID
    const price = 1.22759
    const snapshot = this.mdFactory.FullSnapshot(symbol, id, price)
    this.send(MsgType.MarketDataSnapshotFullRefresh, snapshot)
  }

  private userFixArchive (view: MsgView): void {
    const msg: IUserFixArchive = view.toObject()
    const events: IUserFixArchiveNoEvents[] = msg.NoEvents
    this.logger.info(`event count for archive ${events.length}`)
    for (let i = 0; i < events.length; ++i) {
      const ev = events[i]
      const txt = ev.RawData.toString('utf8')
      this.logger.info(`request to archive this message ${txt}`)
    }
  }

  public sendNews (headline: string): void {
    this.send(MsgType.News, this.mdFactory.News(headline))
  }

  protected onReady (view: MsgView): void {
    // server waits for client to make a request
    this.logger.info('ready for requests.')
  }

  protected onStopped (): void {
    this.logger.info('stopped')
  }

  protected onLogon (view: MsgView, user: string, password: string): boolean {
    return true
  }

  // use msgType for example to persist only trade capture messages to database
  protected onDecoded (msgType: string, txt: string): void {
    this.fixLog.info(txt)
  }

  // no delimiter substitution on transmit messages
  protected onEncoded (msgType: string, txt: string): void {
    this.fixLog.info(txt)
  }
}
