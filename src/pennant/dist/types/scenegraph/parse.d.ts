import { Annotation, Scenegraph } from '../types';
import { BaseSpec, TopLevelSpec } from '../vega-lite/spec';
import { Mark, MarkDef } from '../vega-lite/mark';
import { Data } from '../vega-lite/data';
import { Encoding } from '../vega-lite/encoding';
import { Field } from '../vega-lite/channeldef';
export declare function compileLayer(
  data: Data,
  encoding: Encoding<Field>,
  mark: Mark | MarkDef,
  candleWidth: number
): import('../types').PositionalElement[];
export declare function parseLayer(
  layer: BaseSpec,
  data: Data,
  encoding: Encoding<Field>,
  candleWidth: number
): any[];
/**
 * Parse top-level view specification into a scenegraph model
 * @param specification
 * @param candleWidth
 * @param decimalPlaces
 */
export declare function parse(
  specification: TopLevelSpec,
  candleWidth: number,
  decimalPlaces: number,
  annotations: Annotation[]
): Scenegraph | null;
