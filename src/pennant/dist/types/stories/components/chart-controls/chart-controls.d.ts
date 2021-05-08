/// <reference types="react" />
import './chart-controls.scss';
import { ChartType, Overlay, Study } from '../../../types';
import { Interval } from '../../api/vega-graphql';
export declare type ChartControlsProps = {
  interval: Interval;
  chartType: ChartType;
  overlay: Overlay | null;
  study: Study | null;
  onSetInterval: (interval: Interval) => void;
  onSetChartType: (chartType: ChartType) => void;
  onSetOverlay: (overlay: Overlay | null) => void;
  onSetStudy: (study: Study | null) => void;
  onSnapshot: () => void;
};
export declare const ChartControls: ({
  interval,
  chartType,
  overlay,
  study,
  onSetInterval,
  onSetChartType,
  onSetOverlay,
  onSetStudy,
  onSnapshot,
}: ChartControlsProps) => JSX.Element;
