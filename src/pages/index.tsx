import { FC } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import SafeHydrate from 'components/shared/SafeHydrate';
import Tickers from 'components/home/Tickers';
import TradeForm from 'components/home/TradeForm';
// import TradeChart from 'components/home/TradeChart';
import Stats from 'components/home/Stats/Stats';
const TradeChart = dynamic(() => import('components/home/TradeChart'));

const MARGIN = 2;

const useStyles = makeStyles((theme) => {
  const margin = theme.spacing(MARGIN);
  return {
    tickers: {},
    trade: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      minHeight: 300,
      [theme.breakpoints.down('sm')]: {
        columnGap: 0,
        gridTemplateColumns: 'none',
        rowGap: `${margin}px`,
        gridTemplateRows: '1fr 1fr',
      },
    },
    stats: {
      minHeight: 100,
    },
  };
});

const Index: FC = () => {
  const classes = useStyles();

  return (
    <SafeHydrate>
      <Box mb={MARGIN} className={clsx(classes.tickers)}>
        <Tickers />
      </Box>
      <Paper>
        <Box mb={MARGIN} className={clsx(classes.trade)}>
          <TradeChart />
          <TradeForm />
        </Box>
      </Paper>
      <Box mb={MARGIN} className={clsx(classes.stats)}>
        <Stats />
      </Box>
    </SafeHydrate>
  );
};

export default Index;
