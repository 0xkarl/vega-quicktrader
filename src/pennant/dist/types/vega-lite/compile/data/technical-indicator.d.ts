import { DataFlowNode } from './dataflow';
import { TechnicalIndicatorTransform } from '../../transform';
export declare class TechnicalIndicatorTransformNode extends DataFlowNode {
  private transform;
  constructor(
    parent: DataFlowNode | null,
    transform: TechnicalIndicatorTransform
  );
  dependentFields(): Set<string>;
  producedFields(): Set<string>;
  assemble(): {
    type: string;
    method:
      | 'bollinger'
      | 'envelope'
      | 'eldarRay'
      | 'macd'
      | 'movingAverage'
      | 'exponentialMovingAverage'
      | 'forceIndex'
      | 'relativeStrengthIndex'
      | 'stochasticOscillator';
    on: string;
  };
}
