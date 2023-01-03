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

const root = '../../data/session/'
const commander = require('commander') // (normal include)
const program = new commander.Command()
program
  .option('-p, --port <number>', 'port for http controller', '3000')
  .option('-u, --useDI', 'use DI based construction', false)
  .option('-c, --client <string>', 'client config', `${root}test-initiator.json`)
  .option('-s, --server <string>', 'server config (default no server)', null)
  .option('-l, --logout <number>', 'client logout after seconds', '12')

export interface IOptions {
  port: number
  useDI: boolean
  client: string
  server: string
  logout: number
}

program.parse()
const opts: IOptions = program.opts()
console.log(`port: ${opts.port}, DI: ${opts.useDI ? 'using DI' : 'using factory'}`)

class MySessionContainer extends SessionContainer {
  protected makeSessionFactory (description: ISessionDescription): ISessionMsgFactory {
    return new MsgFact(description)
  }
}

class AppLauncher extends SessionLauncher {
  controller: MdController
  client: MDClient
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
    this.controller.start(opts.port)
    return server
  }

  protected MakeClient (config: IJsFixConfig): FixSession {
    this.client = new MDClient(config)
    setTimeout(() => {
      this.client.endPromise().then(txt => {
        console.log(`client ${txt}`)
      }).catch(e => {
        console.error(e)
      })
    }, opts.logout * 1000)
    return this.client
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
  public constructor (
    client = opts.client,
    server = opts.server) {
    super(client, server)
  }

  /* method 2: override this method for factory construction */
  protected override makeFactory (config: IJsFixConfig): EngineFactory {
    const isInitiator = this.isInitiator(config.description)
    const instance = this
    return {
      makeSession: () => isInitiator
        ? instance.MakeClient(config)
        : instance.MakeServer(config)
    }
  }
}

class DIAppLauncher extends AppLauncher {
  public constructor (
    client = opts.client,
    server = opts.server) {
    super(client, server)
  }

  protected asClient (sessionContainer: DependencyContainer): void {
    const config = sessionContainer.resolve<IJsFixConfig>(DITokens.IJsFixConfig)
    sessionContainer.register<FixSession>(DITokens.FixSession, {
      useFactory: () => this.MakeClient(config)
    })
  }

  protected asServer (sessionContainer: DependencyContainer): void {
    const config = sessionContainer.resolve<IJsFixConfig>(DITokens.IJsFixConfig)
    sessionContainer.register<FixSession>(DITokens.FixSession, {
      useFactory: () => this.MakeServer(config)
    })
  }

  /* method 1: use DI container to register */
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

const l: AppLauncher = opts.useDI
  ? new DIAppLauncher()
  : new FactoryAppLauncher()
l.launcher()
