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
import { LG, SM } from 'components/shared/Screen';

const useStyles = makeStyles((theme) => ({
  container: {
    background: 'black',
  },
  account: {
    marginRight: 10,
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
            <LG>{APP_NAME}</LG>
            <SM>
              <img src='/favicon-32x32.png' alt='logo' width={32} height={32} />
            </SM>
          </div>
        </Typography>

        {shortVegaActiveKey ? (
          <Box className='flex items-center'>
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
            <LG>Connect Vega Wallet</LG>
            <SM>Connect</SM>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
