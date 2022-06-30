import { DITokens, FixSession, IJsFixConfig, IJsFixLogger } from 'jspurefix'

const express = require('express')
const app = express()
const port = 3000
import { inject, injectable } from 'tsyringe'
import { MDServer } from './md-server'

@injectable()
export class MdController {
  private readonly logger: IJsFixLogger
  private server: any
  protected readonly me: string
  constructor (
    @inject(DITokens.IJsFixConfig) public readonly config: IJsFixConfig,
    @inject(DITokens.FixSession) public readonly session: FixSession) {
    const sender = session as MDServer
    const description = config.description
    this.me = description.application.name
    this.server = null
    this.logger = config.logFactory.logger(`${this.me}:MdController`)
    this.subscribe(sender)
  }

  subscribe (session: MDServer) {
    app.get('/news', (req: any, res: any) => {
      this.logger.info('got a request for a news flash')
      const msg = 'mash the buy button!'

      this.logger.info(`sending news headline ${msg}`)
      session.sendNews(msg)
      res.send(msg)
    })
  }

  public stop () {
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

  public start () {
    this.logger.info('start')
    this.server = app.listen(port, () => {
      this.logger.info(`MdController app listening on http://localhost:${port}/news`)
    })
  }
}
