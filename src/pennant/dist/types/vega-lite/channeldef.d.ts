import { Gradient } from './mark';
import { Predicate } from './predicate';
import { Type } from './type';
export declare type PrimitiveValue = number | string | boolean | null;
export declare type Value = PrimitiveValue | number[] | Gradient;
export interface ValueDef<V extends Value = Value> {
  value: V;
}
export interface FieldDef<F extends Field> {
  field?: F;
}
export declare type Field = string;
export declare type MarkPropDef<F extends Field, V extends Value> =
  | FieldDefWithCondition<MarkPropFieldDef<F>, V>
  | ValueDefWithCondition<MarkPropFieldDef<F>, V>;
export declare type MarkPropFieldDef<F extends Field> = FieldDefBase<F>;
export interface FieldDefBase<F> {
  field?: F;
}
export declare type FieldDefWithCondition<
  F extends FieldDef<any>,
  V extends Value = Value
> = F & {
  condition?: Conditional<ValueDef<V>> | Conditional<ValueDef<V>>[];
};
export declare type ValueDefWithCondition<
  F extends FieldDef<any>,
  V extends Value = Value
> = ValueDef & {
  condition?: Conditional<ValueDef<V>> | Conditional<ValueDef<V>>[];
};
export declare type Conditional<
  CD extends FieldDef<any> | ValueDef<any>
> = ConditionalPredicate<CD>;
export declare type ConditionalPredicate<
  CD extends FieldDef<any> | ValueDef<any>
> = {
  test: Predicate;
} & CD;
export interface ValueDef<V extends Value = Value> {
  value: V;
}
export declare type ColorDef<F extends Field> = MarkPropDef<
  F,
  Gradient | string | null
>;
export interface PositionFieldDef<F> {
  field?: F;
  type?: Type;
}
export declare type PositionDef<F extends Field> = PositionFieldDef<F>;
