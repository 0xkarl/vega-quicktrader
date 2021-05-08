import { Interval } from '../stories/api/vega-graphql';
export declare type GQLInterval = keyof typeof Interval;
export interface IntervalOption {
  label: string;
  interval: Interval;
}
/**
 * Creates an array of {interval,label} objects sorted by interval length
 * with translations from i18n/index.ts
 */
export declare function createIntervalOptions(
  intervals: GQLInterval[]
): IntervalOption[];
export declare const INTERVALS: {
  [I in Interval]: string;
};
declare type IntervalUnit = 'M' | 'H' | 'D';
declare type ParsedInterval = [number, IntervalUnit];
/** Parses an interval enum into a value and unit of time */
export declare function parseInterval(interval: Interval): ParsedInterval;
export declare const DEFAULT_CANDLES = 110;
export declare const CANDLE_BUFFER = 20;
export declare function getInitialExtents(
  interval: Interval,
  endDate?: Date
): [Date, Date];
export declare function getTimeFormat(
  interval: Interval
): (() => string) | ((d: Date) => 'HH:mm' | 'MMM d');
export declare function getCandlesCount(
  interval: Interval,
  extents: [Date, Date]
): number;
export declare function getSubMinutes(
  interval: Interval,
  visibleCandleCount: number
): number;
export {};
