export interface IUnderlyingAdditionalTermBondRefGrpNoUnderlyingAdditionalTermBondRefs {
  UnderlyingAdditionalTermBondSecurityID?: string// [1] 41341 (String)
  UnderlyingAdditionalTermBondSecurityIDSource?: string// [2] 41701 (String)
  UnderlyingAdditionalTermBondDesc?: string// [3] 41709 (String)
  EncodedUnderlyingAdditionalTermBondDescLen?: number// [4] 41710 (Length)
  EncodedUnderlyingAdditionalTermBondDesc?: Buffer// [5] 41711 (RawData)
  UnderlyingAdditionalTermBondCurrency?: string// [6] 41712 (String)
  UnderlyingAdditionalTermBondIssuer?: string// [7] 42017 (String)
  EncodedUnderlyingAdditionalTermBondIssuerLen?: number// [8] 42025 (Length)
  EncodedUnderlyingAdditionalTermBondIssuer?: Buffer// [9] 42026 (RawData)
  UnderlyingAdditionalTermBondSeniority?: string// [10] 42027 (String)
  UnderlyingAdditionalTermBondCouponType?: number// [11] 42028 (Int)
  UnderlyingAdditionalTermBondCouponRate?: number// [12] 42029 (Float)
  UnderlyingAdditionalTermBondMaturityDate?: Date// [13] 42030 (LocalDate)
  UnderlyingAdditionalTermBondParValue?: number// [14] 42031 (Float)
  UnderlyingAdditionalTermBondCurrentTotalIssuedAmount?: number// [15] 42032 (Float)
  UnderlyingAdditionalTermBondCouponFrequencyPeriod?: number// [16] 42033 (Int)
  UnderlyingAdditionalTermBondCouponFrequencyUnit?: string// [17] 42034 (String)
  UnderlyingAdditionalTermBondDayCount?: number// [18] 42035 (Int)
}
