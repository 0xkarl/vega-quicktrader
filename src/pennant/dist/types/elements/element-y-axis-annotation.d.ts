import { RenderableElement, ScaleLinear, ScaleTime } from '../types';
export declare class YAxisAnnotationElement implements RenderableElement {
  readonly decimalPlaces: number;
  readonly position: number;
  constructor(position: number, decimalPlaces: number);
  draw(
    ctx: CanvasRenderingContext2D,
    xScale: ScaleTime,
    yScale: ScaleLinear
  ): void;
}
