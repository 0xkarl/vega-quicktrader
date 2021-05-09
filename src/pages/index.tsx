import { FC } from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import Tickers from 'components/home/Tickers';
import TradeForm from 'components/home/TradeForm';
import TradeChart from 'components/home/TradeChart';
import Stats from 'components/home/Stats/Stats';
import { LG, SM } from 'components/shared/Screen';
import { useUI } from 'hooks/ui';

const MARGIN = 2;

const useStyles = makeStyles((theme) => {
  return {
    tickers: {},
    trade: {
      [theme.breakpoints.up('md')]: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        minHeight: 300,
      },
    },
    stats: {
      minHeight: 100,
    },
  };
});

const Index: FC = () => {
  const classes = useStyles();
  const { isShowingChartView } = useUI();

  return (
    <>
      <Box mb={MARGIN} className={clsx(classes.tickers)}>
        <Tickers />
      </Box>
      <Paper>
        <Box mb={MARGIN} className={clsx(classes.trade)}>
          <LG>
            <TradeChart />
            <TradeForm />
          </LG>
          <SM>{isShowingChartView ? <TradeChart /> : <TradeForm />}</SM>
        </Box>
      </Paper>
      <Box mb={MARGIN} className={clsx(classes.stats)}>
        <Stats />
      </Box>
    </>
  );
};

export default Index;
