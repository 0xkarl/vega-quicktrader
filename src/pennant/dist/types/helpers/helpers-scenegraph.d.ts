import { Color, Gradient, Mark } from '../vega-lite/mark';
import { PositionalElement } from '../types';
export declare const PADDING_INNER = 0.4;
export declare function createElement(
  type: Mark,
  options: any
): PositionalElement;
export declare function getAreaConfig(
  data: any,
  x: string,
  y: string,
  y2: string,
  fill: string | Gradient | undefined,
  line: Color | undefined
): {
  points: any;
  fill: string | import('../vega-lite/mark').LinearGradient;
  line: string | undefined;
};
export declare function getBarConfig(
  d: any,
  x: string,
  y: string,
  y2: string,
  width: number,
  fill: string | null,
  stroke: string | null
): {
  x: any;
  y: number;
  height: number;
  width: number;
  fill: string | null;
  stroke: string | null;
};
export declare function getLineConfig(
  data: any,
  x: string,
  y: string,
  color: string | Gradient | undefined
): {
  points: any;
  color: string | import('../vega-lite/mark').LinearGradient | undefined;
};
export declare function getRuleConfig(
  d: any,
  x: string,
  x2: string,
  y: string,
  y2: string,
  color: string | null
): {
  x: any;
  x2: any;
  y: any;
  y2: any;
  color: string | null;
};
export declare function getConditionalColor(
  colorDef: any | undefined
): (datum: any) => string | null;
