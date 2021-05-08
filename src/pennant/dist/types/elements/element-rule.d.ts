import { PositionalElement, ScaleLinear, ScaleTime } from '../types';
export declare type Rule = {
  points: [Date, number][];
  color: string;
};
export declare class RuleElement implements PositionalElement {
  readonly x: Date;
  readonly x2: Date;
  readonly y: number;
  readonly y2: number;
  readonly color: string;
  constructor(cfg: any);
  draw(
    ctx: CanvasRenderingContext2D,
    xScale: ScaleTime,
    yScale: ScaleLinear,
    pixelRatio?: number
  ): void;
}
