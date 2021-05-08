import { FC } from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import { useMarkets } from 'hooks/markets';

const useStyles = makeStyles((theme) => ({
  active: {
    color: theme.palette.secondary.main,
  },
}));

const Tickers: FC = () => {
  const classes = useStyles();
  const { marketsList, activeMarketId, setActiveMarketId } = useMarkets();

  return (
    <Box className='flex'>
      {marketsList.map((m) => (
        <Box
          key={m.id}
          mr={3}
          className={clsx('cursor-pointer', {
            [classes.active]: m.id === activeMarketId,
          })}
          onClick={() => setActiveMarketId(m.id)}
        >
          {m.tradableInstrument.instrument.code}
        </Box>
      ))}
    </Box>
  );
};

export default Tickers;
