import { ISecurityTradingRules } from './security_trading_rules'
import { IStrikeRules } from './strike_rules'

export interface IMarketSegmentGrpNoMarketSegments {
  MarketID?: string// [1] 1301 (String)
  MarketSegmentID?: string// [2] 1300 (String)
  SecurityTradingRules?: ISecurityTradingRules// [3] PriceLimitType.1306, LowLimitPrice.1148 .. NestedInstrAttribValue.1211
  StrikeRules?: IStrikeRules// [4] NoStrikeRules.1201, StrikeRuleID.1223 .. MaturityMonthYearIncrement.1229
}
