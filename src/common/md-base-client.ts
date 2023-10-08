import {
  AsciiSession,
  type MsgView,
  type IJsFixConfig,
  type IJsFixLogger
} from 'jspurefix'

export abstract class MdBaseClient extends AsciiSession {
  protected readonly logger: IJsFixLogger
  protected readonly fixLog: IJsFixLogger

  protected constructor (public readonly config: IJsFixConfig) {
    super(config)
    this.logReceivedMsgs = true
    const name = config?.description?.application?.name ?? ''
    this.fixLog = config.logFactory.plain(`jsfix.${name}.txt`)
    this.logger = config.logFactory.logger(`${this.me}:MDClient`)
  }

  protected abstract onApplicationMsg (msgType: string, view: MsgView): void
  protected abstract onReady (view: MsgView): void

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

  protected onLogon (view: MsgView, user: string, password: string): boolean {
    return true
  }
}
