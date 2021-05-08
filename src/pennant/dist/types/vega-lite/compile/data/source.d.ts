import { Data } from '../../data';
import { DataFlowNode } from './dataflow';
export declare class SourceNode extends DataFlowNode {
  private _data;
  constructor(data: Data);
  dependentFields(): Set<string>;
  producedFields(): Set<string>;
  get data(): import('../../data').InlineData;
}
