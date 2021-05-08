import { RenderableElement, ScaleLinear, ScaleTime } from '../types';
export declare class XAxisElement implements RenderableElement {
  draw(
    ctx: CanvasRenderingContext2D,
    xScale: ScaleTime,
    _yScale: ScaleLinear,
    pixelRatio?: number
  ): void;
}
