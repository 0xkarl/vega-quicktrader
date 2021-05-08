export declare abstract class DataFlowNode {
  private _children;
  private _parent;
  constructor(parent: DataFlowNode | null);
  abstract dependentFields(): Set<string>;
  abstract producedFields(): Set<string>;
  get parent(): DataFlowNode | null;
  set parent(parent: DataFlowNode | null);
  get children(): DataFlowNode[];
  addChild(child: DataFlowNode, loc?: number): void;
}
export declare class OutputNode extends DataFlowNode {
  dependentFields(): Set<string>;
  producedFields(): Set<string>;
}
