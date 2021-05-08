import { RenderableElement, ScaleLinear, ScaleTime } from '../types';
export declare class CrosshairElement implements RenderableElement {
  draw(
    ctx: CanvasRenderingContext2D,
    xScale: ScaleTime,
    yScale: ScaleLinear,
    pixelRatio: number | undefined,
    position: [Date | null, number | null]
  ): void;
}
