export interface ILegPaymentStreamCompoundingFloatingRate {
  LegPaymentStreamCompoundingRateIndex?: string// [1] 42427 (String)
  LegPaymentStreamCompoundingRateIndexCurvePeriod?: number// [2] 42428 (Int)
  LegPaymentStreamCompoundingRateIndexCurveUnit?: string// [3] 42429 (String)
  LegPaymentStreamCompoundingRateMultiplier?: number// [4] 42430 (Float)
  LegPaymentStreamCompoundingRateSpread?: number// [5] 42431 (Float)
  LegPaymentStreamCompoundingRateSpreadPositionType?: number// [6] 42432 (Int)
  LegPaymentStreamCompoundingRateTreatment?: number// [7] 42433 (Int)
  LegPaymentStreamCompoundingCapRate?: number// [8] 42434 (Float)
  LegPaymentStreamCompoundingCapRateBuySide?: number// [9] 42435 (Int)
  LegPaymentStreamCompoundingCapRateSellSide?: number// [10] 42436 (Int)
  LegPaymentStreamCompoundingFloorRate?: number// [11] 42437 (Float)
  LegPaymentStreamCompoundingFloorRateBuySide?: number// [12] 42438 (Int)
  LegPaymentStreamCompoundingFloorRateSellSide?: number// [13] 42439 (Int)
  LegPaymentStreamCompoundingInitialRate?: number// [14] 42440 (Float)
  LegPaymentStreamCompoundingFinalRateRoundingDirection?: string// [15] 42441 (String)
  LegPaymentStreamCompoundingFinalRatePrecision?: number// [16] 42442 (Int)
  LegPaymentStreamCompoundingAveragingMethod?: number// [17] 42443 (Int)
  LegPaymentStreamCompoundingNegativeRateTreatment?: number// [18] 42444 (Int)
}
