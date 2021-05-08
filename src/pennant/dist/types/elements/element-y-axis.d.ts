import { ScaleLinear, ScaleTime } from '../types';
import { RenderableElement } from '../types';
export declare class YAxisElement implements RenderableElement {
  draw(
    ctx: CanvasRenderingContext2D,
    xScale: ScaleTime,
    yScale: ScaleLinear,
    pixelRatio?: number
  ): void;
}
