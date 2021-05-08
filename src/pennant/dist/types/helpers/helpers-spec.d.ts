import { BaseSpec } from '../vega-lite/spec';
import { Candle, ChartType, Overlay, Study } from '../types';
export declare function constructTopLevelSpec(
  data: Candle[],
  chartType: ChartType,
  overlay?: Overlay,
  study?: Study,
  priceMonitoringBounds?: any
): import('../vega-lite/spec/toplevel').TopLevel<
  import('../vega-lite/spec/concat').GenericVConcatSpec<BaseSpec>
>;
