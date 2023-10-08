import { type IJsFixConfig, type IJsFixLogger } from 'jspurefix'

const express = require('express')
const app = express()

export class MdController {
  private readonly logger: IJsFixLogger
  private server: any
  protected readonly me: string
  constructor (
    public readonly config: IJsFixConfig,
    public readonly session: MdAsciiServer) {
    const sender = session
    const description = config.description
    this.me = description?.application?.name ?? 'me'
    this.server = null
    this.logger = config.logFactory.logger(`${this.me}:MdController`)
    this.subscribe(sender)
  }

  subscribe (session: MdAsciiServer): void {
    app.get('/news', (req: any, res: any) => {
      this.logger.info('got a request for a news flash')
      const msg = 'mash the buy button!'

      this.logger.info(`sending news headline ${msg}`)
      session.sendNews(msg)
      res.send(msg)
    })
  }

  public stop (): void {
    this.logger.info('stop')
    if (this.server != null) {
      this.logger.info('closing server')
      this.server.close(() => {
        this.logger.info('closed server')
        this.server = null
      })
    } else {
      this.logger.info('no server to stop')
    }
  }

  public start (port: number): void {
    this.logger.info(`start port = ${port}`)
    this.server = app.listen(port, () => {
      this.logger.info(`MdController app listening on http://localhost:${port}/news`)
    })
  }
}
