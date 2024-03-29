export interface IUnderlyingDividendAccrualFloatingRate {
  UnderlyingDividendFloatingRateIndex?: string// [1] 42801 (String)
  UnderlyingDividendFloatingRateIndexCurvePeriod?: number// [2] 42802 (Int)
  UnderlyingDividendFloatingRateIndexCurveUnit?: string// [3] 42803 (String)
  UnderlyingDividendFloatingRateMultiplier?: number// [4] 42804 (Float)
  UnderlyingDividendFloatingRateSpread?: number// [5] 42805 (Float)
  UnderlyingDividendFloatingRateSpreadPositionType?: number// [6] 42806 (Int)
  UnderlyingDividendFloatingRateTreatment?: number// [7] 42807 (Int)
  UnderlyingDividendCapRate?: number// [8] 42808 (Float)
  UnderlyingDividendCapRateBuySide?: number// [9] 42809 (Int)
  UnderlyingDividendCapRateSellSide?: number// [10] 42810 (Int)
  UnderlyingDividendFloorRate?: number// [11] 42811 (Float)
  UnderlyingDividendFloorRateBuySide?: number// [12] 42812 (Int)
  UnderlyingDividendFloorRateSellSide?: number// [13] 42813 (Int)
  UnderlyingDividendInitialRate?: number// [14] 42814 (Float)
  UnderlyingDividendFinalRateRoundingDirection?: string// [15] 42815 (String)
  UnderlyingDividendFinalRatePrecision?: number// [16] 42816 (Int)
  UnderlyingDividendAveragingMethod?: number// [17] 42817 (Int)
  UnderlyingDividendNegativeRateTreatment?: number// [18] 42818 (Int)
}
