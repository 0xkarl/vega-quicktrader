import { FC, useState } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import { useMarkets } from 'hooks/markets';

const useStyles = makeStyles((theme) => ({
  container: {
    gridGap: '1rem',
  },
  footer: {
    gridGap: '1rem',
    gridTemplateColumns: '1fr 1fr',
  },
}));

const EXPIRE_TYPES = ['Never', '1 minute', '1 hour', '1 day'];
const ORDER_TYPES = ['LIMIT', 'MARKET'];

const TradeForm: FC = () => {
  const classes = useStyles();
  const { trade } = useMarkets();
  const [isWorking, setIsWorking] = useState<string | null>();
  const [side, setSide] = useState<string>('');
  const [orderType, setOrderType] = useState(ORDER_TYPES[0]);
  const [expireType, setExpireType] = useState(0);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;

    setIsWorking('Trading...');
    try {
      await trade({
        price: parseFloat(form.price.value),
        size: parseFloat(form.size.value),
        type: orderType,
        side,
      });
      form.reset();
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
            step: 'any',
          }}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          required
        />

        <TextField
          id='price'
          label='Unit Price'
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

        <FormControl fullWidth>
          <InputLabel shrink id='expires-label'>
            Expires
          </InputLabel>
          <Select
            labelId='expires-label'
            id='expiresAt'
            value={expireType}
            onChange={(e) => setExpireType(Number(e.target.value!))}
            displayEmpty
          >
            {EXPIRE_TYPES.map((name, i) => (
              <MenuItem value={i} key={i}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
