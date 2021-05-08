/// <reference types="react" />
import './candle-info.scss';
import { CandleDetailsExtended } from '../../types';
export declare type CandleInfoProps = {
  candle: CandleDetailsExtended;
  decimalPlaces: number;
};
export declare const CandleInfo: ({
  candle,
  decimalPlaces,
}: CandleInfoProps) => JSX.Element;
