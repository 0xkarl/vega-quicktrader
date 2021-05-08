import { ScaleLinear, ScaleTime } from '../types';
import { RenderableElement } from '../types';
export declare class XAxisTooltipElement implements RenderableElement {
  draw(
    ctx: CanvasRenderingContext2D,
    xScale: ScaleTime,
    _yScale: ScaleLinear,
    pixelRatio: number | undefined,
    position: Date | null
  ): void;
}
