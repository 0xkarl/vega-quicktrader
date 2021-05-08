import { FC, ReactNode } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Header from 'components/global/Header';
import ConnectVegaWallet from 'components/global/ConnectVegaWallet';

const useStyles = makeStyles((theme) => {
  return {
    container: {
      margin: '0 50px',
      padding: '100px 0 30px',
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        padding: '70px 0 10px',
        width: 'auto',
      },
      '& th, td': {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
  };
});

const App: FC<{ children: ReactNode }> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header />
      {children}
      <ConnectVegaWallet />
    </div>
  );
};

export default App;
