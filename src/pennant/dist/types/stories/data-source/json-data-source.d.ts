import { Annotation, DataSource } from '../../types';
import { Interval } from '../api/vega-graphql';
export declare function extendCandle(candle: any, decimalPlaces: number): any;
export declare class JsonDataSource implements DataSource {
  sub: any;
  marketId: string;
  _decimalPlaces: number;
  get decimalPlaces(): number;
  constructor(marketId: string, decimalPlaces: number);
  onReady(): Promise<{
    decimalPlaces: number;
    supportedIntervals: Interval[];
    priceMonitoringBounds: {};
  }>;
  query(interval: Interval, _from: string, _to: string): Promise<any[]>;
  subscribeData(
    _interval: Interval,
    _onSubscriptionData: (datum: any) => void
  ): void;
  unsubscribeData(): void;
  subscribeAnnotations(
    onSubscriptionAnnotation: (annotations: Annotation[]) => void
  ): void;
  unsubscribeAnnotations(): void;
}
