import { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Header from './Header';
import ConnectVegaWallet from './ConnectVegaWallet';
import Notifications from './Notifications';

import Home from 'pages/index';

const MARGIN = 4;

const useStyles = makeStyles((theme) => {
  const margin = theme.spacing(MARGIN);
  return {
    container: {
      [theme.breakpoints.up('sm')]: {
        margin: `0 ${margin}px`,
        padding: '100px 0 30px',
        position: 'relative',
      },
      [theme.breakpoints.down('xs')]: {
        padding: '70px 0 10px',
        width: 'auto',
      },
      '& th, td': {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
  };
});

const App: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header />
      <Home />
      <ConnectVegaWallet />
      <Notifications />
    </div>
  );
};

export default App;
