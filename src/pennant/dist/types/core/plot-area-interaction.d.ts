import { ScaleLinear, ScaleTime } from '../types';
import { Selection } from 'd3-selection';
export declare class PlotAreaInteraction {
  private listeners;
  private _xScale;
  private _yScale;
  private z;
  private zoom;
  constructor(x: ScaleTime, y: ScaleLinear);
  private center;
  draw(selection: Selection<Element, any, any, any>): void;
  on(typenames: string, callback: (this: object, ...args: any[]) => void): this;
  xScale: (x: ScaleTime) => this;
  yScale: (y: ScaleLinear) => this;
}
