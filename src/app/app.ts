import 'reflect-metadata'
import { DependencyContainer } from 'tsyringe'

import {
  DITokens,
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
import { MdController } from './md-controller'

const commander = require('commander') // (normal include)
const program = new commander.Command()
program
  .option('-p, --port <number>', 'port for http controller', 3000)
  .option('-i, --di', 'use DI based construction', false)

program.parse()
const opts = program.opts()
const port: number = opts.port
const useDI: boolean = opts.di
console.log(`port: ${port}, DI: ${useDI ? 'using DI' : 'using factory'}`)

class MySessionContainer extends SessionContainer {
  protected makeSessionFactory (description: ISessionDescription): ISessionMsgFactory {
    return new MsgFact(description)
  }
}

class AppLauncher extends SessionLauncher {
  controller: MdController

  public constructor (
    client: string,
    server: string) {
    super(client, server)
    this.sessionContainer = new MySessionContainer()
    this.root = __dirname
  }

  // register a custom object with the DI container.

  protected MakeServer (config: IJsFixConfig): FixSession {
    const server = new MDServer(config)
    this.controller = new MdController(config, server)
    this.controller.start(port)
    return server
  }

  stopController (): void {
    if (this.controller != null) {
      this.controller.stop()
    }
  }

  public launcher (): void {
    const instance = this
    this.run().then(() => {
      instance.stopController()
      console.log('finished.')
    }).catch(e => {
      console.error(e)
    })
  }
}

class FactoryAppLauncher extends AppLauncher {
  controller: MdController

  public constructor (
    client = '../../data/session/test-initiator.json',
    server = '../../data/session/test-acceptor.json') {
    super(client, server)
  }

  /* method 2: override this method for factory construction */
  protected override makeFactory (config: IJsFixConfig): EngineFactory {
    const isInitiator = this.isInitiator(config.description)
    const instance = this
    return {
      makeSession: () => isInitiator
        ? new MDClient(config)
        : instance.MakeServer(config)
    }
  }
}

class DIAppLauncher extends AppLauncher {
  controller: MdController

  public constructor (
    client = '../../data/session/test-initiator.json',
    server = '../../data/session/test-acceptor.json') {
    super(client, server)
  }

  protected asClient (sessionContainer: DependencyContainer): void {
    sessionContainer.register<FixSession>(DITokens.FixSession, {
      useClass: MDClient
    })
  }

  protected asServer (sessionContainer: DependencyContainer): void {
    const config = sessionContainer.resolve<IJsFixConfig>(DITokens.IJsFixConfig)
    sessionContainer.register<FixSession>(DITokens.FixSession, {
      useFactory: () => this.MakeServer(config)
    })
  }

  protected override registerApplication (sessionContainer: DependencyContainer): void {
    const config = sessionContainer.resolve<IJsFixConfig>(DITokens.IJsFixConfig)
    const isInitiator = this.isInitiator(config.description)
    if (isInitiator) {
      this.asClient(sessionContainer)
    } else {
      this.asServer(sessionContainer)
    }
  }
}

const l: AppLauncher = useDI ? new DIAppLauncher() : new FactoryAppLauncher()
l.launcher()
