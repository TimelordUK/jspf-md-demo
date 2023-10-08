import {
  MsgView,
  IJsFixConfig,
} from 'jspurefix'

import { IMarketDataSnapshotFullRefresh, INews, IUserFixArchive, MsgType } from '../../types/FIX44'
import { AsciiView } from 'jspurefix/dist/buffer/ascii'
import { Md44Factory } from './md44-factory'
import {MdBaseClient} from "../../common/md-base-client";

export class Md44Client extends MdBaseClient {
  private readonly mdFactory: Md44Factory = new Md44Factory()
  constructor (public readonly config: IJsFixConfig) {
    super(config)
  }

  // turn our view nack to a raw msg and send

  private sendArchivist (msgType: string, view: MsgView): void {
    const viewBuffer = (view as AsciiView).toBuffer()
    const asTxt = viewBuffer.toString()
    this.logger.info(asTxt)
    // @ts-expect-error ts2307
    const archive: IUserFixArchive = {
      NoEvents: [
        {
          Subject: msgType,
          RawData: viewBuffer,
          RawDataLength: viewBuffer.length
        }
      ]
    }
    this.send(MsgType.UserFixArchive, archive)
  }

  protected onApplicationMsg (msgType: string, view: MsgView): void {
    this.logger.info(`${msgType} ${view.toJson()}`)
    switch (msgType) {
      case MsgType.News: {
        this.news(view, msgType)
        break
      }

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

  private news (view: MsgView, msgType: string): void {
    const news: INews = view.toObject() as INews
    this.logger.info(news.Headline)
    // send the news to 'archive' service as a user defined message
    this.sendArchivist(msgType, view)
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
