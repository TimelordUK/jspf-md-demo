import {
  AsciiSession,
  MsgView,
  IJsFixConfig,
  IJsFixLogger,
  MsgType } from 'jspurefix'

import { MDFactory } from './md-factory'
import { inject, injectable } from 'tsyringe'

@injectable()
export class MDClient extends AsciiSession {
  private readonly logger: IJsFixLogger
  private readonly fixLog: IJsFixLogger

  constructor (@inject('IJsFixConfig') public readonly config: IJsFixConfig) {
    super(config)
    this.logReceivedMsgs = true
    this.fixLog = config.logFactory.plain(`jsfix.${config!.description!.application!.name}.txt`)
    this.logger = config.logFactory.logger(`${this.me}:MDClient`)
  }

  protected onApplicationMsg (msgType: string, view: MsgView): void {
    this.logger.info(`${view.toJson()}`)
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
    setTimeout(() => {
      this.done()
    }, logoutSeconds * 1000)
  }

  protected onLogon (view: MsgView, user: string, password: string): boolean {
    return true
  }
}
