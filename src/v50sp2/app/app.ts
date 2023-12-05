import 'reflect-metadata'

import {
  EngineFactory,
  IJsFixConfig,
  ISessionDescription,
  ISessionMsgFactory,
  SessionContainer
} from 'jspurefix'
import { Md50Client } from './md50-client'
import { Md50Server } from './md50-server'
import { Msg50Fact } from './msg50-fact'
import { OptionParser } from '../../common/option-parser'
import { BaseAppLauncher } from '../../common/base-app-launcher'
import { MdBaseClient } from '../../common/md-base-client'
import { MdBaseServer } from '../../common/md-base-server'
import { BaseDIAppLauncher } from '../../common/base-di-app-launcher'
import { BaseFactoryAppLauncher } from '../../common/base-factory-app-launcher'
import { IMd50Description } from '../../../dist/v50sp2/app/md50-description'

const root = '../../data/session/v50sp2/'

const opts: IOptions = new OptionParser(root).get()

console.log(`port: ${opts.port}, DI: ${opts.useDI ? 'using DI' : 'using factory'}`)

class MySessionContainer extends SessionContainer {
  protected makeSessionFactory (description: ISessionDescription): ISessionMsgFactory {
    return new Msg50Fact(description as IMd50Description)
  }
}

class FactoryAppLauncher extends BaseFactoryAppLauncher {
  public constructor (options: IOptions) {
    super(options, new MySessionContainer())
  }

  protected newClient (config: IJsFixConfig): MdBaseClient {
    return new Md50Client(config)
  }

  protected newServer (config: IJsFixConfig): MdBaseServer {
    return new Md50Server(config)
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
    return new Md50Client(config)
  }

  protected newServer (config: IJsFixConfig): MdBaseServer {
    return new Md50Server(config)
  }
}

const l: BaseAppLauncher = opts.useDI
  ? new DIAppLauncher(opts)
  : new FactoryAppLauncher(opts)
l.launcher()
