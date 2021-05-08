export declare const chartTypes: readonly ['area', 'candle', 'line'];
export declare type ChartType = typeof chartTypes[number];
export declare const chartTypeLabels: Record<ChartType, string>;
export declare const overlays: readonly [
  'bollinger',
  'envelope',
  'priceMonitoringBounds'
];
export declare type Overlay = typeof overlays[number];
export declare const overlayLabels: Record<Overlay, string>;
export declare const studies: readonly ['eldarRay', 'macd', 'volume'];
export declare type Study = typeof studies[number];
export declare const studyLabels: Record<Study, string>;
export declare type Viewport = {
  date: Date;
  intervalWidth: number;
};
export declare type Bounds = [Date, Date];
export interface ChartElement {
  /**
   * Changes the center of the chart by the given number of intervals.
   */
  panBy(n: number): void;
  /**
   * Changes the center of the chart to the most recent Date.
   */
  reset(): void;
  /**
   * Snapshot of chart as Blob
   */
  snapshot(): Promise<Blob | null>;
  /**
   * Increases the zoom of the chart by delta.
   */
  zoomIn(delta: number): void;
  /**
   * Decreases the zoom of the chart by delta.
   */
  zoomOut(delta: number): void;
}
