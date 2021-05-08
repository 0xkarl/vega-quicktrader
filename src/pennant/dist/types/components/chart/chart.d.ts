import './chart.scss';
import { Viewport, ChartType, DataSource, Overlay, Study } from '../../types';
import { ChartElement } from '../../types';
import { Interval } from '../../stories/api/vega-graphql';
import React from 'react';
export declare type Options = {
  chartType?: ChartType;
  overlays?: Overlay[];
  studies?: Study[];
};
export declare type ChartProps = {
  dataSource: DataSource;
  initialViewport?: Viewport;
  interval: Interval;
  options?: Options;
  onOptionsChanged?: (options: Options) => void;
  onViewportChanged?: (viewport: Viewport) => void;
};
export declare const Chart: React.ForwardRefExoticComponent<
  ChartProps & React.RefAttributes<ChartElement>
>;
