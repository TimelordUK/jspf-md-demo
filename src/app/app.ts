import 'reflect-metadata'

import { IJsFixConfig, SessionLauncher, DITokens, FixSession, ISessionDescription, JsFixConfig } from 'jspurefix'
import { DependencyContainer } from 'tsyringe'
import { MDClient } from './md-client'
import { MDServer } from './md-server'
import { MsgFact } from './msg-fact'

class AppLauncher extends SessionLauncher {
  public constructor (
    client: string = '../../data/session/test-initiator.json',
    server: string = '../../data/session/test-acceptor.json') {
    super(client, server)
    this.root = __dirname
  }

  private customFactory (sessionContainer: DependencyContainer): IJsFixConfig {
    const d = sessionContainer.resolve<ISessionDescription>(DITokens.ISessionDescription)
    const oldConfig = sessionContainer.resolve<IJsFixConfig>(DITokens.IJsFixConfig)
    // our own factory which we can use to add custom logon tags
    const fact = new MsgFact(d)
    // clear container as set up by system
    sessionContainer.clearInstances()
    // re-register base system
    this.sessionContainer.registerGlobal()
    // add back original description
    sessionContainer.registerInstance(DITokens.ISessionDescription, d)
    // register our own session factory with our own logon
    sessionContainer.registerInstance(DITokens.ISessionMsgFactory, fact)
    // now re-create a new config using our own factory
    const newConfig = new JsFixConfig(fact, oldConfig.definitions, d, oldConfig.delimiter, oldConfig.logFactory)
    return newConfig
  }

  protected override registerApplication (sessionContainer: DependencyContainer): void {
    const newConfig = this.customFactory(sessionContainer)
    const isInitiator = this.isInitiator(newConfig.description)
    if (isInitiator) {
      sessionContainer.register<FixSession>(DITokens.FixSession, {
        useFactory: () => new MDClient(newConfig)
      })
    } else {
      sessionContainer.register<FixSession>(DITokens.FixSession, {
        useFactory: () => new MDServer(newConfig)
      })
    }
    this.sessionContainer.registerSession(newConfig, sessionContainer)
  }

  /*
  protected override makeFactory (config: IJsFixConfig): EngineFactory {
    const isInitiator = this.isInitiator(config.description)
    return {
      makeSession: () => isInitiator ?
        new MDClient(config) :
        new MDServer(config)
    } as EngineFactory
  }*/
}

const l = new AppLauncher()
l.exec()
