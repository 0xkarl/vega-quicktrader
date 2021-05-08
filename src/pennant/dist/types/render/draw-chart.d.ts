import { ScaleLinear, ScaleTime } from 'd3-scale';
import { Scenegraph } from '../types';
export declare function drawChart(
  index: number,
  event: any,
  timeScale: ScaleTime<number, number, never>,
  timeScaleRescaled: ScaleTime<number, number, never>,
  plotScale: ScaleLinear<number, number, never>,
  plotScaleRescaled: ScaleLinear<number, number, never>,
  studyScale: ScaleLinear<number, number, never>,
  studyScaleRescaled: ScaleLinear<number, number, never>,
  scenegraph: Scenegraph,
  requestRedraw: () => void,
  onBoundsChanged: ((bounds: [Date, Date]) => void) | undefined
): void;
export declare function drawChartNoTransform(
  timeScaleRescaled: ScaleTime<number, number, never>,
  scenegraph: Scenegraph,
  requestRedraw: () => void,
  onBoundsChanged: ((bounds: [Date, Date]) => void) | undefined
): void;
