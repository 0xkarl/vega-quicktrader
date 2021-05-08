import { RenderableElement, ScaleLinear, ScaleTime } from '../types';
export declare class AnnotationElement implements RenderableElement {
  readonly decimalPlaces: number;
  readonly position: number | null;
  constructor(decimalPlaces: number, position: number | null);
  draw(
    ctx: CanvasRenderingContext2D,
    xScale: ScaleTime,
    yScale: ScaleLinear
  ): void;
}
