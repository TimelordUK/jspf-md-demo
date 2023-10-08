import {FixSession, IJsFixConfig, SessionContainer, SessionLauncher} from "jspurefix";
import {MdController} from "./md-controller";
import {MdBaseClient} from "./md-base-client";
import {MdBaseServer} from "./md-base-server";

export abstract class BaseAppLauncher extends SessionLauncher {
    controller: MdController
    client: MdBaseClient
    protected constructor (
        public options: IOptions,
        sc: SessionContainer) {
        super(options.client, options.server)
        this.sessionContainer = sc
        this.root = __dirname
    }

    // register a custom object with the DI container.

    protected abstract newClient(config: IJsFixConfig): MdBaseClient
    protected abstract newServer(config: IJsFixConfig): MdBaseServer

    protected MakeServer (config: IJsFixConfig): FixSession {
        const server =this.newServer(config)
        this.controller = new MdController(config, server)
        this.controller.start(this.options.port)
        return server
    }

    protected MakeClient (config: IJsFixConfig): FixSession {
        this.client = this.newClient(config)
        setTimeout(() => {
            this.client.endPromise().then(txt => {
                console.log(`client ${txt}`)
            }).catch(e => {
                console.error(e)
            })
        }, this.options.logout * 1000)
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