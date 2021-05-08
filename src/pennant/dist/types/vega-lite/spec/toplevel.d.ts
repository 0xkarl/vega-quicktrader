import { InlineDataset } from '../data';
import { BaseSpec } from './base';
export declare type Datasets = Record<string, InlineDataset>;
export declare type TopLevel<S extends BaseSpec> = S & {
  datasets?: Datasets;
};
