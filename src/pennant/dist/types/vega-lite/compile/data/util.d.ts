import { DataFlowNode } from './dataflow';
export declare class PlaceholderDataFlowNode extends DataFlowNode {
  dependentFields(): Set<string>;
  producedFields(): Set<string>;
}
