import { MDClient } from './md-client'
import { MDServer } from './md-server'
import { IJsFixConfig, initiator, acceptor } from 'jspurefix'
import { Launcher } from './launcher'

class AppLauncher extends Launcher {
  public constructor () {
    super(
      './../../data/session/test-initiator.json',
      './../../data/session/test-acceptor.json')
  }

  protected getAcceptor (config: IJsFixConfig): Promise<any> {
    return acceptor(config, c => new MDServer(c))
  }

  protected getInitiator (config: IJsFixConfig): Promise<any> {
    return initiator(config, c => new MDClient(c))
  }
}

const l = new AppLauncher()
l.run().then(() => {
  console.log('finished.')
}).catch(e => {
  console.log(e)
})
