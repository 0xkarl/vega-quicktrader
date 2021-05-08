import { RenderableElement, ScaleLinear, ScaleTime } from '../types';
export declare class PlotArea {
  private _crosshair;
  private ctx;
  private _data;
  private gridline;
  private latestPriceCrosshair;
  private latestPricePosition;
  private _pixelRatio;
  private position;
  private _renderableElements;
  private _xScale;
  private _yEncodingFields;
  private _yScale;
  constructor(
    x: ScaleTime,
    y: ScaleLinear,
    elements: RenderableElement[],
    originalData: any[],
    fields: string[]
  );
  context(context: CanvasRenderingContext2D): this;
  crosshair(pos: [Date | null, number | null]): this;
  data(originalData: any[]): this;
  draw(): void;
  extent(bounds?: [Date, Date]): any[];
  getIndex(offset: number): [number, Date];
  pixelRatio(ratio: number): this;
  latestPrice(price: number | null): this;
  renderableElements(elements: RenderableElement[]): this;
  xScale(x: ScaleTime): this;
  yEncodingFields(fields: string[]): this;
  yScale(y: ScaleLinear): this;
}
