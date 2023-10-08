import { type EngineFactory, type IJsFixConfig, type SessionContainer } from 'jspurefix'
import { BaseAppLauncher } from './base-app-launcher'
import { type MdBaseClient } from './md-base-client'
import { type MdBaseServer } from './md-base-server'

export abstract class BaseFactoryAppLauncher extends BaseAppLauncher {
  protected constructor (public options: IOptions,
    sc: SessionContainer) {
    super(options, sc)
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

  protected abstract newClient (config: IJsFixConfig): MdBaseClient
  protected abstract newServer (config: IJsFixConfig): MdBaseServer
}
