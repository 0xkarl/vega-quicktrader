import { FC, useState, useMemo } from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { useMarkets } from 'contexts/markets';
import { useParty } from 'contexts/party';
import { useUI } from 'contexts/ui';
import { useWallet } from 'contexts/vega-wallet';

const useStyles = makeStyles((theme) => ({
  container: {
    gridGap: '1rem',
  },
  depositButton: {
    padding: 0,
  },
  footer: {
    gridGap: '1rem',
    gridTemplateColumns: '1fr 1fr',
  },
}));

const EXPIRE_TYPES = [
  ['Never', 0],
  ['1 minute', 1 * 60],
  ['1 hour', 60 * 60],
  ['1 day', 24 * 60 * 60],
];
const ORDER_TYPES = ['LIMIT', 'MARKET'];
// const MARKET_ORDER_TIME_IN_FORCE_TYPES = [
//   ['Immediate or cancel', 'IOC'],
//   ['Fill or kill', 'FOK'],
// ];

const TradeForm: FC = () => {
  const classes = useStyles();
  const { trade } = useMarkets();
  const { showErrorNotification } = useUI();
  const { activeKey } = useWallet();
  const { activeMarket } = useMarkets();
  const { activeMarketBalance } = useParty();

  const [isWorking, setIsWorking] = useState<string | null>();
  const [side, setSide] = useState<string>('');
  const [orderType, setOrderType] = useState(ORDER_TYPES[0]);
  const [expiresAt, setExpiresAt] = useState(0);

  const isMarketOrder = orderType === ORDER_TYPES[1];

  const formattedActiveMarketBalance = useMemo(
    () =>
      !activeMarket
        ? 0
        : activeMarketBalance /
          Math.pow(
            10,
            activeMarket.tradableInstrument.instrument.product.settlementAsset
              .decimals
          ),
    [activeMarketBalance, activeMarket]
  );

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;

    setIsWorking('Trading...');
    try {
      if (isMarketOrder) {
        await trade({
          size: parseFloat(form.size.value),
          type: orderType,
          side,
        });
      } else {
        await trade({
          price: parseFloat(form.price.value),
          size: parseFloat(form.size.value),
          type: orderType,
          side,
          expiresAt,
        });
      }
      form.reset();
    } catch (e) {
      showErrorNotification(e);
    } finally {
      setIsWorking(null);
    }
  };

  return (
    <form {...{ onSubmit }}>
      <Box className={clsx('flex', 'flex-col', classes.container)} p={3}>
        <FormControl fullWidth>
          <InputLabel shrink id='type-label'>
            Order Type
          </InputLabel>
          <Select
            labelId='type-label'
            id='type'
            value={orderType}
            onChange={(e) => setOrderType(e.target.value! as string)}
          >
            {ORDER_TYPES.map((name, i) => (
              <MenuItem value={name} key={i}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id='size'
          label='Size'
          type='number'
          inputProps={{
            step: '1',
          }}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          required
        />

        {isMarketOrder ? null : (
          <TextField
            id='price'
            label={
              <>
                Price (
                {!activeMarket
                  ? null
                  : activeMarket.tradableInstrument.instrument.product
                      .settlementAsset.symbol}
                )
              </>
            }
            type='number'
            inputProps={{
              step: 'any',
            }}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
          />
        )}

        {isMarketOrder ? (
          <>
            {/* 
          <FormControl fullWidth>
            <InputLabel shrink id='time-in-force-label'>
              Time In Force
            </InputLabel>
            <Select
              labelId='time-in-force-label'
              id='time-in-force'
              value={timeInForce}
              onChange={(e) => setTimeInForce(e.target.value!)}
              displayEmpty
            >
              {MARKET_ORDER_TIME_IN_FORCE_TYPES.map(([k, v]) => (
                <MenuItem value={v} key={v}>
                  {k}
                </MenuItem>
              ))}
            </Select>
        </FormControl>
         */}
            {null}
          </>
        ) : (
          <FormControl fullWidth>
            <InputLabel shrink id='expires-label'>
              Expires
            </InputLabel>
            <Select
              labelId='expires-label'
              id='expiresAt'
              value={expiresAt}
              onChange={(e) => setExpiresAt(Number(e.target.value!))}
              displayEmpty
            >
              {EXPIRE_TYPES.map(([name, time]) => (
                <MenuItem value={time} key={time}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {!(activeKey && activeMarket) ? null : (
          <Box className={'flex'}>
            Balance: {formattedActiveMarketBalance}{' '}
            {
              activeMarket.tradableInstrument.instrument.product.settlementAsset
                .symbol
            }{' '}
            (
            <Button
              color='secondary'
              size='small'
              disabled
              type='button'
              onClick={() => {}}
              className={classes.depositButton}
            >
              deposit
            </Button>
            )
          </Box>
        )}

        <Box className={clsx('grid', classes.footer)}>
          <Button
            color='secondary'
            variant='contained'
            disabled={!!isWorking}
            type='submit'
            onClick={() => setSide('BUY')}
          >
            {isWorking || 'Long'}
          </Button>
          <Button
            color='secondary'
            variant='contained'
            disabled={!!isWorking}
            type='submit'
            onClick={() => setSide('SELL')}
          >
            {isWorking || 'Short'}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default TradeForm;
