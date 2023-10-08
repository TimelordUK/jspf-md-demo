import 'reflect-metadata'

import {
  EngineFactory,
  IJsFixConfig,
  ISessionDescription,
  ISessionMsgFactory,
  SessionContainer
} from 'jspurefix'
import { Md44Client } from './md44-client'
import { Md44Server } from './md44-server'
import { Msg44Fact } from './msg44-fact'
import { OptionParser } from '../../common/option-parser'
import { MdBaseClient } from '../../common/md-base-client'
import { MdBaseServer } from '../../common/md-base-server'
import { BaseFactoryAppLauncher } from '../../common/base-factory-app-launcher'
import { BaseAppLauncher } from '../../common/base-app-launcher'
import { BaseDIAppLauncher } from '../../common/base-di-app-launcher'

const root = '../../data/session/v44/'
const opts: IOptions = new OptionParser(root).get()
console.log(`port: ${opts.port}, DI: ${opts.useDI ? 'using DI' : 'using factory'}`)

class MySessionContainer extends SessionContainer {
  protected makeSessionFactory (description: ISessionDescription): ISessionMsgFactory {
    return new Msg44Fact(description)
  }
}

class FactoryAppLauncher extends BaseFactoryAppLauncher {
  public constructor (options: IOptions) {
    super(options, new MySessionContainer())
  }

  protected newClient (config: IJsFixConfig): MdBaseClient {
    return new Md44Client(config)
  }

  protected newServer (config: IJsFixConfig): MdBaseServer {
    return new Md44Server(config)
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

class DIAppLauncher extends BaseDIAppLauncher {
  public constructor (options: IOptions) {
    super(options, new MySessionContainer())
  }

  protected newClient (config: IJsFixConfig): MdBaseClient {
    return new Md44Client(config)
  }

  protected newServer (config: IJsFixConfig): MdBaseServer {
    return new Md44Server(config)
  }
}

const l: BaseAppLauncher = opts.useDI
  ? new DIAppLauncher(opts)
  : new FactoryAppLauncher(opts)
l.launcher()
