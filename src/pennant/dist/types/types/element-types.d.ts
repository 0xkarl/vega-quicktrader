export interface CandleDetailsExtended {
  date: Date;
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
}
export interface PriceMonitoringBounds {
  minValidPrice: number;
  maxValidPrice: number;
  referencePrice: number;
}
