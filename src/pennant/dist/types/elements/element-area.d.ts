import { PositionalElement, ScaleLinear, ScaleTime } from '../types';
import { Gradient } from '../vega-lite/mark';
export declare type Area = {
  points: [Date, number, number][];
  fill: string | Gradient;
  line: string | undefined;
};
export declare class AreaElement implements PositionalElement {
  readonly points: [Date, number, number][];
  readonly fill: string | Gradient;
  readonly line: string | undefined;
  get x(): Date;
  constructor(cfg: any);
  draw(
    ctx: CanvasRenderingContext2D,
    xScale: ScaleTime,
    yScale: ScaleLinear
  ): void;
}
