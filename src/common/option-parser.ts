const commander = require('commander') // (normal include)

export class OptionParser {
  constructor (public root: string) {
  }

  public get (): IOptions {
    const program = new commander.Command()
    program
      .option('-p, --port <number>', 'port for http controller', '3000')
      .option('-u, --useDI', 'use DI based construction', false)
      .option('-c, --client <string>', 'client config', `${this.root}test-initiator.json`)
      .option('-s, --server <string>', 'server config (default no server)', null)
      .option('-l, --logout <number>', 'client logout after seconds', '30')
    program.parse()
    const opts: IOptions = program.opts()
    return opts
  }
}
