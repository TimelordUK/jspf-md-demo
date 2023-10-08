import 'reflect-metadata'
import { DependencyContainer } from 'tsyringe'

import {
  DITokens,
  EngineFactory,
  FixSession,
  IJsFixConfig,
  ISessionDescription,
  ISessionMsgFactory,
  SessionContainer
} from 'jspurefix'
import { Md50Client } from './md50-client'
import { Md50Server } from './md50-server'
import { Msg50Fact } from './msg50-fact'
import {OptionParser} from "../../common/option-parser";
import {BaseAppLauncher} from "../../common/app-launcher";
import {MdBaseClient} from "../../common/md-base-client";
import {MdBaseServer} from "../../common/md-base-server";

const root = '../../data/session/v50sp2/'

const opts: IOptions = new OptionParser(root).get()

console.log(`port: ${opts.port}, DI: ${opts.useDI ? 'using DI' : 'using factory'}`)

class MySessionContainer extends SessionContainer {
  protected makeSessionFactory (description: ISessionDescription): ISessionMsgFactory {
    return new Msg50Fact(description)
  }
}

class AppLauncher extends BaseAppLauncher {
  constructor(options: IOptions) {
    super(options, new MySessionContainer())
  }
  protected newClient(config: IJsFixConfig): MdBaseClient {
    return new Md50Client(config);
  }

  protected newServer(config: IJsFixConfig): MdBaseServer {
    return new Md50Server(config);
  }
}

class FactoryAppLauncher extends AppLauncher {
  public constructor (options: IOptions) {
    super(options)
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
  public constructor (options: IOptions) {
    super(options)
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
  ? new DIAppLauncher(opts)
  : new FactoryAppLauncher(opts)
l.launcher()
