import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch, Redirect } from 'react-router-dom';

import { WalletProvider } from 'hooks/vega-wallet';
import { MarketsProvider } from 'hooks/markets';
import { UIProvider } from 'hooks/ui';

import Trade from 'pages/Trade';
import Wallet from 'pages/Wallet';

import App from 'components/global/App';
import theme from 'utils/theme';
import './styles.css';

render(
  <StrictMode>
    <ThemeProvider {...{ theme }}>
      <CssBaseline />

      <WalletProvider>
        <MarketsProvider>
          <UIProvider>
            <BrowserRouter>
              <App>
                <Switch>
                  <Route path='/wallet'>
                    <Wallet />
                  </Route>
                  <Route path='/trade'>
                    <Trade />
                  </Route>
                  <Redirect to='/trade' />
                </Switch>
              </App>
            </BrowserRouter>
          </UIProvider>
        </MarketsProvider>
      </WalletProvider>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
