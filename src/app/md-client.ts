import {
  AsciiSession,
  MsgView,
  IJsFixConfig,
  IJsFixLogger,
  MsgType
} from 'jspurefix'

import { MDFactory } from './md-factory'
import { inject, injectable } from 'tsyringe'
import { INews } from '../types'

@injectable()
export class MDClient extends AsciiSession {
  private readonly logger: IJsFixLogger
  private readonly fixLog: IJsFixLogger
  constructor (@inject('IJsFixConfig') public readonly config: IJsFixConfig) {
    super(config)
    this.logReceivedMsgs = true
    const name = config?.description?.application?.name ?? ''
    this.fixLog = config.logFactory.plain(`jsfix.${name}.txt`)
    this.logger = config.logFactory.logger(`${this.me}:MDClient`)
  }

  protected onApplicationMsg (msgType: string, view: MsgView): void {
    this.logger.info(`${msgType} ${view.toJson()}`)
    switch (msgType) {
      case MsgType.News: {
        const news: INews = view.toObject()
        this.logger.info(news.Headline)
        break
      }
    }
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
    const mdr = MDFactory.BidOfferRequest('GBPUSD')
    this.send(MsgType.MarketDataRequest, mdr)
  }

  protected onLogon (view: MsgView, user: string, password: string): boolean {
    return true
  }
}
