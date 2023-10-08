import {
  MsgView,
  IJsFixConfig
} from 'jspurefix'

import { IMarketDataSnapshotFullRefresh, MsgType } from '../../types/FIX50SP2'
import { Md50Factory } from './md50-factory'
import { MdBaseClient } from '../../common/md-base-client'

export class Md50Client extends MdBaseClient {
  private readonly mdFactory: Md50Factory = new Md50Factory()
  constructor (public readonly config: IJsFixConfig) {
    super(config)
  }

  protected onApplicationMsg (msgType: string, view: MsgView): void {
    this.logger.info(`${msgType} ${view.toJson()}`)
    switch (msgType) {
      case MsgType.MarketDataSnapshotFullRefresh: {
        this.marketDataSnapshotFullRefresh(view)
        break
      }

      default: {
        this.logger.info(`unknown msgType ${msgType}`)
        break
      }
    }
  }

  private marketDataSnapshotFullRefresh (view: MsgView): void {
    const refresh: IMarketDataSnapshotFullRefresh = view.toObject() as IMarketDataSnapshotFullRefresh
    const symbol: string = refresh.Instrument?.SecurityID ?? 'na'
    this.logger.info(`received a MD refresh on instrument ${symbol}`)
    this.logger.info(JSON.stringify(refresh, null, 4))
  }

  protected onReady (view: MsgView): void {
    this.logger.info('ready')
    const logoutSeconds = 32
    this.logger.info(`will logout after ${logoutSeconds}`)
    const mdr = this.mdFactory.BidOfferRequest('GBPUSD')
    this.send(MsgType.MarketDataRequest, mdr)
  }
}
