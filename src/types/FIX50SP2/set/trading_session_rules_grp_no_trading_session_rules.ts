import { ITradingSessionRules } from './trading_session_rules'

export interface ITradingSessionRulesGrpNoTradingSessionRules {
  TradingSessionID?: string// [1] 336 (String)
  TradingSessionSubID?: string// [2] 625 (String)
  TradingSessionRules?: ITradingSessionRules// [3] 
}
