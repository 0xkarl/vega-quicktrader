import { FC } from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ChartIcon from '@material-ui/icons/InsertChart';
import TradeIcon from '@material-ui/icons/ViewAgenda';

import { useMarkets } from 'contexts/markets';
import { useUI } from 'contexts/ui';

import { LG, SM } from 'components/shared/Screen';

const useStyles = makeStyles((theme) => ({
  active: {
    color: theme.palette.secondary.main,
  },
  sm: {
    paddingLeft: 16,
    paddingRight: 16,
  },
}));

const Tickers: FC = () => {
  const classes = useStyles();
  const { marketsList, activeMarketId, setActiveMarketId } = useMarkets();
  const { isShowingChartView, toggleIsShowingChartView } = useUI();

  return (
    <>
      <LG>
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
      </LG>
      <SM>
        <Box className={clsx(classes.sm, 'flex items-center')}>
          <Box className='flex-grow'>
            {!activeMarketId ? null : (
              <Select
                labelId='tickers-label'
                id='tickers'
                value={activeMarketId}
                onChange={(e) => {
                  const id = e.target.value! as string;
                  setActiveMarketId(id);
                }}
              >
                {marketsList.map((m) => (
                  <MenuItem value={m.id} key={m.id}>
                    {m.tradableInstrument.instrument.code}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Box>

          <Box className='cursor-pointer' onClick={toggleIsShowingChartView}>
            {isShowingChartView ? <TradeIcon /> : <ChartIcon />}
          </Box>
        </Box>
      </SM>
    </>
  );
};

export default Tickers;
