import { type DependencyContainer } from 'tsyringe'
import { DITokens, type FixSession, type IJsFixConfig, type SessionContainer } from 'jspurefix'
import { BaseAppLauncher } from './base-app-launcher'

export abstract class BaseDIAppLauncher extends BaseAppLauncher {
  protected constructor (options: IOptions,
    sc: SessionContainer) {
    super(options, sc)
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
