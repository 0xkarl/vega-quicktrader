import { FC } from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import Tickers from 'components/trade/Tickers';
import TradeForm from 'components/trade/TradeForm';
import TradeChart from 'components/trade/TradeChart';
import Stats from 'components/trade/Stats/Stats';
import { LG, SM } from 'components/shared/Screen';
import { useUI } from 'contexts/ui';

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

const Trade: FC = () => {
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

export default Trade;
