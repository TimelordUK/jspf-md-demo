import 'reflect-metadata'

import {
  IJsFixConfig, SessionLauncher, EngineFactory,
  ISessionDescription, SessionContainer, ISessionMsgFactory, FixSession
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
  public makeController (c: IJsFixConfig, session: FixSession) {
    const sessionContainer = c.sessionContainer
    sessionContainer.register<MdController>(MDTokens.MDController, {
      useFactory: () => new MdController(c, session)
    })
    this.controller = sessionContainer.resolve<MdController>(MDTokens.MDController)
    this.controller.start()
  }

  stopController () {
    if (this.controller != null) {
      this.controller.stop()
    }
  }

  private makeSession (config: IJsFixConfig): FixSession {
    const server = new MDServer(config)
    this.makeController(config, server)
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
