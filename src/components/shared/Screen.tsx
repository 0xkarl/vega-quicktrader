import { FC, ReactNode } from 'react';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import { LG_BREAKPOINT, SM_BREAKPOINT } from 'config';

const LGScreen: FC<{ width: any; children: ReactNode }> = ({
  width,
  children,
}) => (isWidthUp(LG_BREAKPOINT, width) ? <>{children}</> : null);
export const LG = withWidth()(LGScreen);

const SMScreen: FC<{ width: any; children: ReactNode }> = ({
  width,
  children,
}) => (isWidthDown(SM_BREAKPOINT, width) ? <>{children}</> : null);
export const SM = withWidth()(SMScreen);
