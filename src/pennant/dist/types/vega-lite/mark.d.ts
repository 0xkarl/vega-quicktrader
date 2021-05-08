import { Field } from './channeldef';
export declare const Mark: {
  readonly area: 'area';
  readonly bar: 'bar';
  readonly line: 'line';
  readonly rule: 'rule';
};
export declare type Mark = keyof typeof Mark;
export declare type Color = string;
export declare type BaseValueRef<T> =
  | {
      value: T | null;
    }
  | {
      field: Field;
    };
export interface BaseGradient {
  gradient: 'linear';
}
export interface GradientStop {
  offset: number;
  color: Color;
}
export declare type Gradient = LinearGradient;
export interface LinearGradient extends BaseGradient {
  gradient: 'linear';
  stops: GradientStop[];
}
export declare type ColorValueRef =
  | BaseValueRef<Color>
  | {
      value: LinearGradient;
    }
  | {
      gradient: Field;
      start?: number[];
      stop?: number[];
      count?: number;
    }
  | {
      color: Color;
    };
export interface MarkDef {
  type: string | Mark;
  line?: {
    color: Color;
  };
  color?: Color | Gradient;
}
