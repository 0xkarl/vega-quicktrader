import { DataFlowNode } from './dataflow';
import { DataComponent } from '.';
import { Model } from '../model';
export declare function parseTransformArray(
  head: DataFlowNode,
  model: Model
): DataFlowNode;
export declare function parseData(model: Model): DataComponent;
