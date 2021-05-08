import { PositionalElement, ScaleLinear, ScaleTime } from '../types';
export declare type Line = {
  points: [Date, number][];
  color: string;
};
export declare class LineElement implements PositionalElement {
  readonly points: [Date, number][];
  readonly color: string;
  get x(): Date;
  constructor(cfg: any);
  draw(
    ctx: CanvasRenderingContext2D,
    xScale: ScaleTime,
    yScale: ScaleLinear,
    pixelRatio?: number
  ): void;
}
