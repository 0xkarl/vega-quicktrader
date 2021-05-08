import { Field } from './channeldef';
export declare type Predicate = FieldLTPredicate | FieldGTPredicate;
export interface FieldPredicateBase {
  field: Field;
}
export interface FieldLTPredicate extends FieldPredicateBase {
  lt: string | number;
}
export declare function isFieldLTPredicate(
  predicate: any
): predicate is FieldLTPredicate;
export interface FieldGTPredicate extends FieldPredicateBase {
  gt: string | number;
}
export declare function isFieldGTPredicate(
  predicate: any
): predicate is FieldGTPredicate;
