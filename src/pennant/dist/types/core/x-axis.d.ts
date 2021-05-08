import { ScaleTime } from '../types';
/**
 * The x-axis component renders human readable reference marks.
 */
export declare class XAxis {
  private axis;
  private ctx;
  private _pixelRatio;
  private position;
  private tooltip;
  private _xScale;
  constructor(x: ScaleTime);
  context(context: CanvasRenderingContext2D): this;
  crosshair(pos: Date | null): this;
  draw(): void;
  pixelRatio(ratio: number): this;
  xScale(x: ScaleTime): this;
}
