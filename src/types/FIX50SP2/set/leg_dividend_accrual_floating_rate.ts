export interface ILegDividendAccrualFloatingRate {
  LegDividendFloatingRateIndex?: string// [1] 42312 (String)
  LegDividendFloatingRateIndexCurvePeriod?: number// [2] 42313 (Int)
  LegDividendFloatingRateIndexCurveUnit?: string// [3] 42314 (String)
  LegDividendFloatingRateMultiplier?: number// [4] 42315 (Float)
  LegDividendFloatingRateSpread?: number// [5] 42316 (Float)
  LegDividendFloatingRateSpreadPositionType?: number// [6] 42317 (Int)
  LegDividendFloatingRateTreatment?: number// [7] 42318 (Int)
  LegDividendCapRate?: number// [8] 42319 (Float)
  LegDividendCapRateBuySide?: number// [9] 42320 (Int)
  LegDividendCapRateSellSide?: number// [10] 42321 (Int)
  LegDividendFloorRate?: number// [11] 42322 (Float)
  LegDividendFloorRateBuySide?: number// [12] 42323 (Int)
  LegDividendFloorRateSellSide?: number// [13] 42324 (Int)
  LegDividendInitialRate?: number// [14] 42325 (Float)
  LegDividendFinalRateRoundingDirection?: string// [15] 42326 (String)
  LegDividendFinalRatePrecision?: number// [16] 42327 (Int)
  LegDividendAveragingMethod?: number// [17] 42328 (Int)
  LegDividendNegativeRateTreatment?: number// [18] 42329 (Int)
}
