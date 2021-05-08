import 'd3-transition';
import '@d3fc/d3fc-element';
import './plot-container.scss';
import * as React from 'react';
import { Viewport, ChartElement, Scenegraph } from '../../types';
import { Interval } from '../../stories/api/vega-graphql';
export declare type PlotContainerProps = {
  width: number;
  height: number;
  decimalPlaces: number;
  scenegraph: Scenegraph;
  interval: Interval;
  initialViewport: Viewport;
  onViewportChanged?: (viewport: Viewport) => void;
  onRightClick?: (position: [number, number]) => void;
  onGetDataRange?: (from: Date, to: Date, interval: Interval) => void;
  onClosePanel: (id: string) => void;
};
export declare const PlotContainer: React.ForwardRefExoticComponent<
  PlotContainerProps & React.RefAttributes<ChartElement>
>;
