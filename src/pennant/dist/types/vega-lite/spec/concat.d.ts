import { BaseSpec } from './base';
export interface GenericVConcatSpec<S extends BaseSpec> extends BaseSpec {
  vconcat: S[];
}
export declare function isVConcatSpec(
  spec: BaseSpec
): spec is GenericVConcatSpec<any>;
