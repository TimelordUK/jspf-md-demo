import {
  AsciiSession,
  MsgView,
  IJsFixConfig,
  IJsFixLogger
} from 'jspurefix'

import { IMarketDataSnapshotFullRefresh, INews, IUserFixArchive, MsgType } from '../types'
import { AsciiView } from 'jspurefix/dist/buffer/ascii'
import { MDFactory } from './md-factory'

export class MDClient extends AsciiSession {
  private readonly logger: IJsFixLogger
  private readonly fixLog: IJsFixLogger
  private readonly mdFactory: MDFactory = new MDFactory()
  constructor (public readonly config: IJsFixConfig) {
    super(config)
    this.logReceivedMsgs = true
    const name = config?.description?.application?.name ?? ''
    this.fixLog = config.logFactory.plain(`jsfix.${name}.txt`)
    this.logger = config.logFactory.logger(`${this.me}:MDClient`)
  }

  // turn our view nack to a raw msg and send

  private sendArchivist (msgType: string, view: MsgView): void {
    const viewBuffer = (view as AsciiView).toBuffer()
    const asTxt = viewBuffer.toString()
    this.logger.info(asTxt)
    // @ts-expect-error ts2307
    const archive: IUserFixArchive = {
      NoEvents: [
        {
          Subject: msgType,
          RawData: viewBuffer,
          RawDataLength: viewBuffer.length
        }
      ]
    }
    this.send(MsgType.UserFixArchive, archive)
  }

  protected onApplicationMsg (msgType: string, view: MsgView): void {
    this.logger.info(`${msgType} ${view.toJson()}`)
    switch (msgType) {
      case MsgType.News: {
        this.news(view, msgType)
        break
      }

      case MsgType.MarketDataSnapshotFullRefresh: {
        this.marketDataSnapshotFullRefresh(view)
        break
      }

      default: {
        this.logger.info(`unknown msgType ${msgType}`)
        break
      }
    }
  }

  private news (view: MsgView, msgType: string): void {
    const news: INews = view.toObject() as INews
    this.logger.info(news.Headline)
    // send the news to 'archive' service as a user defined message
    this.sendArchivist(msgType, view)
  }

  private marketDataSnapshotFullRefresh (view: MsgView): void {
    const refresh: IMarketDataSnapshotFullRefresh = view.toObject() as IMarketDataSnapshotFullRefresh
    const symbol: string = refresh.Instrument?.SecurityID ?? 'na'
    this.logger.info(`received a MD refresh on instrument ${symbol}`)
    this.logger.info(JSON.stringify(refresh, null, 4))
  }

  public async endPromise (): Promise<string> {
    const instance = this
    return await new Promise((resolve, reject) => {
      if (this.transport !== null) {
        const handle = setTimeout(() => {
          reject(new Error('did not cleanly stop'))
        }, 5 * 1000)
        instance.on('done', () => {
          clearTimeout(handle)
          resolve('done')
        })
        instance.done()
      } else {
        resolve('already stopped')
      }
    })
  }

  protected onStopped (): void {
    this.logger.info('stopped')
  }

  // use msgType for example to persist only trade capture messages to database
  protected onDecoded (msgType: string, txt: string): void {
    this.fixLog.info(txt)
  }

  // no delimiter substitution on transmit messages
  protected onEncoded (msgType: string, txt: string): void {
    this.fixLog.info(txt)
  }

  protected onReady (view: MsgView): void {
    this.logger.info('ready')
    const logoutSeconds = 32
    this.logger.info(`will logout after ${logoutSeconds}`)
    const mdr = this.mdFactory.BidOfferRequest('GBPUSD')
    this.send(MsgType.MarketDataRequest, mdr)
  }

  protected onLogon (view: MsgView, user: string, password: string): boolean {
    return true
  }
}
