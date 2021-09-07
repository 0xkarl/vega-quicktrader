import { FC, useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { APP_NAME } from 'config';
import { useWallet as useVegaWallet } from 'contexts/vega-wallet';
import { LG, SM } from 'components/shared/Screen';

const useStyles = makeStyles((theme) => ({
  container: {
    background: 'black',
  },
  account: {
    marginRight: 10,
  },
  links: {},
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  activeLink: {
    color: theme.palette.secondary.main,
  },
}));

const OPTIONS = [
  ['Trade', '/trade'],
  ['Wallet', '/wallet'],
];

const Header: FC = () => {
  const classes = useStyles();
  const {
    activeKey: vegaActiveKey,
    startConnecting: startConnectingVegaWallet,
    disconnect: disconnectVegaWallet,
  } = useVegaWallet();

  const shortVegaActiveKey = useMemo(() => {
    if (!vegaActiveKey) return null;
    return `${vegaActiveKey.slice(0, 4)}..${vegaActiveKey.slice(-4)}`;
  }, [vegaActiveKey]);

  const path = window.location.pathname;

  return (
    <AppBar position='fixed' color='inherit' className={classes.container}>
      <Toolbar color='inherit'>
        <Typography variant='h6' className={'flex flex-grow'}>
          <div className={'flex flex-col'}>
            <LG>{APP_NAME}</LG>
            <SM>
              <img
                src='/favicon-196x196.png'
                alt='logo'
                width={32}
                height={32}
              />
            </SM>
          </div>
        </Typography>

        <Box className={clsx(classes.links, 'flex')} mr={4}>
          {OPTIONS.map(([name, link]) => (
            <Link
              key={link}
              to={link}
              className={clsx(classes.link, {
                [classes.activeLink]: link === path,
              })}
            >
              <Box mx={1}>{name}</Box>
            </Link>
          ))}
        </Box>

        {shortVegaActiveKey ? (
          <Box className='flex items-center'>
            <div className={classes.account}>{shortVegaActiveKey}</div>
            <CloseIcon
              className='cursor-pointer'
              onClick={disconnectVegaWallet}
            ></CloseIcon>
          </Box>
        ) : (
          <Button color='secondary' onClick={startConnectingVegaWallet}>
            <LG>Connect Vega Wallet</LG>
            <SM>Connect</SM>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
