/// <reference types="zen-observable" />
import { Annotation, Candle, DataSource } from '../../types';
import { Interval } from '../api/vega-graphql';
import { ApolloClient } from '@apollo/client';
export declare function extendCandle(
  candle: any,
  decimalPlaces: number
): Candle;
export declare class ApolloDataSource implements DataSource {
  client: ApolloClient<any>;
  candlesSub: ZenObservable.Subscription | null;
  marketDataSub: ZenObservable.Subscription | null;
  positionsSub: ZenObservable.Subscription | null;
  ordersSub: ZenObservable.Subscription | null;
  marketId: string;
  partyId: string;
  _decimalPlaces: number;
  orderAnnotations: Annotation[];
  positionAnnotations: Annotation[];
  get decimalPlaces(): number;
  constructor(
    client: ApolloClient<any>,
    marketId: string,
    partyId: string,
    decimalPlaces: number
  );
  onReady(): Promise<{
    decimalPlaces: any;
    supportedIntervals: Interval[];
    priceMonitoringBounds: any;
  }>;
  query(interval: Interval, from: string, _to: string): Promise<Candle[]>;
  subscribeData(
    interval: Interval,
    onSubscriptionData: (datum: any) => void
  ): void;
  unsubscribeData(): void;
  subscribeAnnotations(
    onSubscriptionAnnotation: (annotations: Annotation[]) => void
  ): void;
  unsubscribeAnnotations(): void;
}
