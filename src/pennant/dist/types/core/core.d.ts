import { RenderableElement, Viewport } from '../types';
import { MutableRefObject } from 'react';
export declare type Panes<T> = {
  [id: string]: T;
};
export declare type ChartPanel = {
  id: string;
  ref: React.RefObject<HTMLDivElement>;
  data: any[];
  renderableElements: RenderableElement[];
  yEncodingFields: string[];
};
/**
 * The chart component renders multiple plot areas which share a common x-axis.
 *
 * Zooming and panning of plot areas is supported. Dragging the axes will zoom the apprpriate dimension.
 */
export declare class Core {
  private listeners;
  private _interval;
  private _decimalPlaces;
  private isPinned;
  private isFreePan;
  private dates;
  private xAxis;
  private xAxisInteraction;
  private xElement;
  private xScale;
  private xTransform;
  private xZoom;
  private yAxes;
  private yAxisInteractions;
  private yElements;
  private yScales;
  private yTransforms;
  private yZooms;
  private plotAreas;
  private plotAreaInteractions;
  private plotAreaElements;
  constructor(
    panels: Panes<ChartPanel>,
    axis: {
      ref: MutableRefObject<HTMLDivElement>;
      data: any[];
    },
    initialViewport: Viewport,
    decimalPlaces?: number
  );
  draw(): void;
  interval(interval: number): this;
  on(typenames: string, callback: (this: object, ...args: any[]) => void): this;
  panBy(n: number): void;
  initialize(initialViewport?: Viewport): void;
  reset(): void;
  pinXAxis(): void;
  resetXAxis(): void;
  resetYAxis(id: string): void;
  update(
    panels: Panes<ChartPanel>,
    axis: {
      ref: React.MutableRefObject<HTMLDivElement>;
      data: any[];
    }
  ): this;
  private zoom;
  private zoomed;
  zoomIn(delta: number): void;
  zoomOut(delta: number): void;
}
