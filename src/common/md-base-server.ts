import { AsciiSession, type IJsFixConfig, type IJsFixLogger, type MsgView } from 'jspurefix'

export abstract class MdBaseServer extends AsciiSession implements MdAsciiServer {
  protected readonly logger: IJsFixLogger
  protected readonly fixLog: IJsFixLogger

  protected constructor (public readonly config: IJsFixConfig) {
    super(config)
    this.logReceivedMsgs = true
    this.checkMsgIntegrity = false
    this.logger = config.logFactory.logger(`${this.me}:MDServer`)
    const name = config?.description?.application?.name ?? ''
    this.fixLog = config.logFactory.plain(`jsfix.${name}.txt`)
  }

  protected abstract onApplicationMsg (msgType: string, view: MsgView): void
  public abstract sendNews (headline: string): void
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
