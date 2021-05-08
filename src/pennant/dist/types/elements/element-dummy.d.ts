import { RenderableElement, ScaleLinear, ScaleTime } from '../types';
export declare class DummyElement implements RenderableElement {
  readonly x: Date;
  constructor(cfg: any);
  draw(
    _ctx: CanvasRenderingContext2D,
    _xScale: ScaleTime,
    _yScale: ScaleLinear
  ): void;
}
