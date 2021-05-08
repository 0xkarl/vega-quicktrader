import { Candle, DataSource } from '../../types';
import { Interval } from '../api/vega-graphql';
export declare class CryptoCompareDataSource implements DataSource {
  get decimalPlaces(): number;
  onReady(): Promise<{
    decimalPlaces: number;
    supportedIntervals: Interval[];
    priceMonitoringBounds: {};
  }>;
  query(interval: Interval, from: string, to: string): Promise<Candle[]>;
  subscribeData(
    _interval: Interval,
    onSubscriptionData: (datum: any) => void
  ): void;
  unsubscribeData(): void;
}
