import { ScaleLinear, ScaleTime } from '../types';
import { RenderableElement } from '../types';
export declare class YAxisTooltipElement implements RenderableElement {
  readonly decimalPlaces: number;
  constructor(decimalPlaces: number);
  draw(
    ctx: CanvasRenderingContext2D,
    xScale: ScaleTime,
    yScale: ScaleLinear,
    pixelRatio: number | undefined,
    position: number | null
  ): void;
}
