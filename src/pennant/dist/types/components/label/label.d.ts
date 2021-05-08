import './label.scss';
import * as React from 'react';
import { Intent } from '../../types';
export declare type LabelProps = {
  cells: {
    label: string;
    stroke?: boolean;
    fill?: boolean;
    onClick?: () => void;
  }[];
  intent: Intent;
};
export declare const Label: React.ForwardRefExoticComponent<
  LabelProps & React.RefAttributes<HTMLDivElement>
>;
