import { FC, useState } from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import { useWallet } from 'contexts/vega-wallet';

const useStyles = makeStyles(() => ({
  container: {
    height: 400,
    gridRowGap: '1rem',
  },
  keyRow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const WALLET_PRESETS = [
  {
    name: 'Vega Hosted Wallet',
    host: 'https://wallet.testnet.vega.xyz/api/v1',
  },
  { name: 'Local Wallet', host: 'http://localhost:1789/api/v1' },
];

const ConnectVegaWallet: FC = () => {
  const classes = useStyles();
  const {
    isConnecting,
    setIsConnecting,
    connect,
    keys,
    setActiveKey,
    isSelectingActiveKey,
  } = useWallet();
  const [isWorking, setIsWorking] = useState<string | null>(null);
  const [selectHost, setSelectHost] = useState(WALLET_PRESETS[0].host);
  const [inputHost, setInputHost] = useState(WALLET_PRESETS[0].host);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setIsWorking('Connecting...');
    try {
      await connect({
        host: e.target.host.value.trim(),
        wallet: e.target.wallet.value.trim(),
        passphrase: e.target.passphrase.value.trim(),
      });
    } finally {
      setIsWorking(null);
    }
  };

  return (
    <Dialog
      onClose={() => {}}
      aria-labelledby='vega-wallet-connect'
      open={isConnecting}
      fullWidth
      maxWidth={'sm'}
    >
      {isSelectingActiveKey ? (
        <Box className={clsx('flex', 'flex-col', classes.container)} p={4}>
          <Typography variant='h5'>Select Key</Typography>

          {keys.map((key) => (
            <Box
              key={key.pub}
              onClick={() => {
                setActiveKey(key.pub);
                setIsConnecting(false);
              }}
              className={clsx('cursor-pointer', classes.keyRow)}
            >
              {key.pub}
            </Box>
          ))}
        </Box>
      ) : (
        <form {...{ onSubmit }}>
          <Box className={clsx('flex', 'flex-col', classes.container)} p={4}>
            <div className={clsx('flex')}>
              <Typography className='flex-grow' variant='h5'>
                Connect Wallet
              </Typography>
              <CloseIcon
                className='cursor-pointer'
                style={{ fontSize: 20 }}
                onClick={() => setIsConnecting(false)}
              />
            </div>

            <Select
              labelId='wallet-preset-label'
              id='wallet-presets'
              value={selectHost}
              onChange={(e) => {
                const host = e.target.value! as string;
                setSelectHost(host);
                setInputHost(host);
              }}
            >
              {WALLET_PRESETS.map((p) => (
                <MenuItem value={p.host} key={p.host}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              id='host'
              label='Wallet location'
              type='text'
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={inputHost}
              onChange={(e) => setInputHost(e.target.value)}
              required
            />

            <TextField
              id='wallet'
              label='Username'
              type='text'
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />

            <TextField
              id='passphrase'
              label='Passphrase'
              type='password'
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />

            <Button
              color='secondary'
              variant='contained'
              disabled={!!isWorking}
              type='submit'
            >
              {isWorking || 'Connect'}
            </Button>
          </Box>
        </form>
      )}
    </Dialog>
  );
};

export default ConnectVegaWallet;
