import 'reflect-metadata'
const commander = require('commander') // (normal include)
const program = new commander.Command()
program
  .option('-p, --port <number>', 'port for http controller', 3000)

program.parse()
const port: number = program.opts().port
console.log(`port: ${port}`)

import {
  EngineFactory,
  FixSession,
  IJsFixConfig,
  ISessionDescription,
  ISessionMsgFactory,
  SessionContainer,
  SessionLauncher
} from 'jspurefix'
import { MDClient } from './md-client'
import { MDServer } from './md-server'
import { MsgFact } from './msg-fact'
import { MDTokens } from './md-tokens'
import { MdController } from './md-controller'

class MySessionContainer extends SessionContainer {
  protected makeSessionFactory (description: ISessionDescription): ISessionMsgFactory {
    return new MsgFact(description)
  }
}

class AppLauncher extends SessionLauncher {
  controller: MdController
  public constructor (
    client: string = '../../data/session/test-initiator.json',
    server: string = '../../data/session/test-acceptor.json') {
    super(client, server)
    this.sessionContainer = new MySessionContainer()
    this.root = __dirname
  }

  // register a custom object with the DI container.
  public makeController (c: IJsFixConfig, session: FixSession): MdController {
    const sessionContainer = c.sessionContainer
    sessionContainer.register<MdController>(MDTokens.MDController, {
      useFactory: () => new MdController(c, session)
    })
    return sessionContainer.resolve<MdController>(MDTokens.MDController)
  }

  stopController () {
    if (this.controller != null) {
      this.controller.stop()
    }
  }

  private makeSession (config: IJsFixConfig): FixSession {
    const server = new MDServer(config)
    this.controller = this.makeController(config, server)
    this.controller.start(port)
    return server
  }

  public launcher () {
    const instance = this
    this.run().then(() => {
      instance.stopController()
      console.log('finished.')
    }).catch(e => {
      console.error(e)
    })
  }

  protected override makeFactory (config: IJsFixConfig): EngineFactory {
    const isInitiator = this.isInitiator(config.description)
    const instance = this
    return {
      makeSession: () => isInitiator ?
        new MDClient(config) :
        instance.makeSession(config)
    } as EngineFactory
  }
}

const l = new AppLauncher()
l.launcher()
