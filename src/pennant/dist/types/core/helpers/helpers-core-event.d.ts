import { ScaleLinear, ScaleTime } from '../../types';
import { Selection } from 'd3-selection';
import { ZoomBehavior, ZoomTransform } from 'd3-zoom';
import { PlotArea } from '../plot-area';
import { XAxis } from '../x-axis';
import { YAxis } from '../y-axis';
import { Panes } from '../core';
import { PlotAreaInteraction } from '../plot-area-interaction';
export declare function handleXAxisDrag(
  xElement: Selection<Element, unknown, null, undefined>,
  xZoom: ZoomBehavior<Element, unknown>,
  e: any,
  xScale: ScaleTime,
  isPinned: boolean,
  xTransform: () => ZoomTransform,
  xAxis: XAxis,
  plotAreas: Panes<PlotArea>,
  yAxes: Panes<YAxis>,
  onBoundsChanged: (bounds: [Date, Date]) => void,
  onRedraw: () => void
): void;
export declare function handleYAxisDrag(
  yElements: Panes<Selection<Element, any, null, undefined>>,
  yZooms: Panes<ZoomBehavior<Element, unknown>>,
  e: any,
  yScales: Panes<ScaleLinear>,
  yTransforms: Panes<() => ZoomTransform>,
  plotAreas: Panes<PlotArea>,
  yAxes: Panes<YAxis>,
  id: string,
  onFreePanChanged: (isFreePan: boolean) => void,
  onRedraw: () => void
): void;
export declare function measureXAxis(
  event: {
    detail: {
      width: number;
      pixelRatio: number;
    };
  },
  xScale: ScaleTime,
  xTransform: () => ZoomTransform,
  xAxis: XAxis,
  yAxes: Panes<YAxis>,
  plotAreas: Panes<PlotArea>,
  onBoundsChanged: (bounds: [Date, Date]) => void
): void;
export declare function drawXAxis(event: any, xAxis: XAxis): void;
export declare function handleZoomend(
  plotAreas: Panes<PlotArea>,
  offset: [number, number],
  xAxis: XAxis,
  yAxes: Panes<YAxis>,
  id: string,
  onRedraw: () => void
): void;
export declare function handleZoomstart(
  plotAreas: Panes<PlotArea>,
  yAxes: Panes<YAxis>,
  xAxis: XAxis
): void;
export declare function measureYAxis(
  event: any,
  scale: ScaleLinear,
  yTransform: () => ZoomTransform,
  plotArea: PlotArea,
  yAxis: YAxis,
  isFreePan: boolean,
  id: string,
  resetYAxis: (id: string) => void
): void;
export declare function drawPlotAreaInteraction(
  event: any,
  plotAreaInteractions: Panes<PlotAreaInteraction>,
  id: string
): void;
export declare function drawPlotArea(
  event: any,
  plotAreas: Panes<PlotArea>,
  id: string
): void;
export declare function drawYAxis(
  event: any,
  yAxes: Panes<YAxis>,
  id: string
): void;
export declare function handleMouseout(
  plotAreas: Panes<PlotArea>,
  xAxis: XAxis,
  yAxes: Panes<YAxis>,
  onMouseout: () => void,
  onRedraw: () => void
): void;
export declare function handleMousemove(
  plotAreas: Panes<PlotArea>,
  offset: [number, number],
  xScale: ScaleTime,
  yScale: ScaleLinear,
  yAxes: Panes<YAxis>,
  xAxis: XAxis,
  id: string,
  onMousemove: (index: number, id: string) => void,
  onRedraw: () => void
): void;
