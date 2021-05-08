import { FC, useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import { APP_NAME } from 'config';
import { useWallet as useVegaWallet } from 'hooks/vega-wallet';

const useStyles = makeStyles((theme) => ({
  container: {
    background: 'black',
  },
  account: {
    marginRight: 10,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const Header: FC = () => {
  const classes = useStyles();
  const {
    activeKey: vegaActiveKey,
    setIsConnecting: setIsConnectingVegaWallet,
    disconnect: disconnectVegaWallet,
  } = useVegaWallet();

  const shortVegaActiveKey = useMemo(() => {
    if (!vegaActiveKey) return null;
    return `${vegaActiveKey.slice(0, 4)}..${vegaActiveKey.slice(-4)}`;
  }, [vegaActiveKey]);

  return (
    <AppBar position='fixed' color='inherit' className={classes.container}>
      <Toolbar color='inherit'>
        <Typography variant='h6' className={'flex flex-grow'}>
          <div className={'flex flex-col'}>
            <div>{APP_NAME}</div>
          </div>
        </Typography>

        {shortVegaActiveKey ? (
          <Box className='flex'>
            <div className={classes.account}>{shortVegaActiveKey}</div>
            <CloseIcon
              className='cursor-pointer'
              onClick={disconnectVegaWallet}
            ></CloseIcon>
          </Box>
        ) : (
          <Button
            color='secondary'
            onClick={() => setIsConnectingVegaWallet(true)}
          >
            Connect Vega Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
