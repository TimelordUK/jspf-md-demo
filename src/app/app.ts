import 'reflect-metadata'

import {
  IJsFixConfig, SessionLauncher, EngineFactory,
  ISessionDescription, SessionContainer, ISessionMsgFactory
} from 'jspurefix'
import { MDClient } from './md-client'
import { MDServer } from './md-server'
import { MsgFact } from './msg-fact'

class MySessionContainer extends SessionContainer {
  protected makeSessionFactory (description: ISessionDescription): ISessionMsgFactory {
    return new MsgFact(description)
  }
}

class AppLauncher extends SessionLauncher {
  public constructor (
    client: string = '../../data/session/test-initiator.json',
    server: string = '../../data/session/test-acceptor.json') {
    super(client, server)
    this.sessionContainer = new MySessionContainer()
    this.root = __dirname
  }

  protected override makeFactory (config: IJsFixConfig): EngineFactory {
    const isInitiator = this.isInitiator(config.description)
    return {
      makeSession: () => isInitiator ?
        new MDClient(config) :
        new MDServer(config)
    } as EngineFactory
  }
}

const l = new AppLauncher()
l.exec()
