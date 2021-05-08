import { ScaleLinear, ScaleTime } from '../types';
/**
 * The y-axis component renders human readable reference marks.
 */
export declare class YAxis {
  private axis;
  private ctx;
  private latestPricePosition;
  private _pixelRatio;
  private position;
  private tooltip;
  private latestPriceTooltip;
  private _xScale;
  private _yScale;
  constructor(x: ScaleTime, y: ScaleLinear, decimalPlaces?: number);
  context(context: CanvasRenderingContext2D): this;
  crosshair(pos: number | null): this;
  draw(): void;
  latestPrice(price: number | null): this;
  pixelRatio(ratio: number): this;
  xScale(x: ScaleTime): this;
  yScale(y: ScaleLinear): this;
}
