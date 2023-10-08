export interface IUnderlyingPaymentStreamResetDates {
  UnderlyingPaymentStreamResetDateRelativeTo?: number// [1] 40592 (Int)
  UnderlyingPaymentStreamResetDateBusinessDayConvention?: number// [2] 40593 (Int)
  UnderlyingPaymentStreamResetFrequencyPeriod?: number// [3] 40595 (Int)
  UnderlyingPaymentStreamResetFrequencyUnit?: string// [4] 40596 (String)
  UnderlyingPaymentStreamResetWeeklyRollConvention?: string// [5] 40597 (String)
  UnderlyingPaymentStreamInitialFixingDateRelativeTo?: number// [6] 40598 (Int)
  UnderlyingPaymentStreamInitialFixingDateBusinessDayConvention?: number// [7] 40599 (Int)
  UnderlyingPaymentStreamInitialFixingDateOffsetPeriod?: number// [8] 40601 (Int)
  UnderlyingPaymentStreamInitialFixingDateOffsetUnit?: string// [9] 40602 (String)
  UnderlyingPaymentStreamInitialFixingDateOffsetDayType?: number// [10] 40603 (Int)
  UnderlyingPaymentStreamInitialFixingDateAdjusted?: Date// [11] 40604 (LocalDate)
  UnderlyingPaymentStreamFixingDateRelativeTo?: number// [12] 40605 (Int)
  UnderlyingPaymentStreamFixingDateBusinessDayConvention?: number// [13] 40606 (Int)
  UnderlyingPaymentStreamFixingDateOffsetPeriod?: number// [14] 40608 (Int)
  UnderlyingPaymentStreamFixingDateOffsetUnit?: string// [15] 40609 (String)
  UnderlyingPaymentStreamFixingDateOffsetDayType?: number// [16] 40610 (Int)
  UnderlyingPaymentStreamFixingDateAdjusted?: Date// [17] 40611 (LocalDate)
  UnderlyingPaymentStreamRateCutoffDateOffsetPeriod?: number// [18] 40612 (Int)
  UnderlyingPaymentStreamRateCutoffDateOffsetUnit?: string// [19] 40613 (String)
  UnderlyingPaymentStreamRateCutoffDateOffsetDayType?: number// [20] 40614 (Int)
}