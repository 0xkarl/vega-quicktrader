/// <reference types="react" />
import './price-monitoring-info.scss';
export declare type PriceMonitoringInfoProps = {
  priceMonitoringBounds: {
    minValidPrice: number;
    maxValidPrice: number;
    referencePrice: number;
  };
  decimalPlaces: number;
};
export declare const PriceMonitoringInfo: ({
  priceMonitoringBounds,
  decimalPlaces,
}: PriceMonitoringInfoProps) => JSX.Element;
