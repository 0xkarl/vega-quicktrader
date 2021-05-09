import { FC, ReactNode } from 'react';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';

const LGScreen: FC<{ width: any; children: ReactNode }> = ({
  width,
  children,
}) => (isWidthUp('sm', width) ? <>{children}</> : null);
export const LG = withWidth()(LGScreen);

const SMScreen: FC<{ width: any; children: ReactNode }> = ({
  width,
  children,
}) => (isWidthDown('xs', width) ? <>{children}</> : null);
export const SM = withWidth()(SMScreen);
