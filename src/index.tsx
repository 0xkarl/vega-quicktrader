import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch, Redirect } from 'react-router-dom';

import { WalletProvider } from 'contexts/vega-wallet';
import { MarketsProvider } from 'contexts/markets';
import { UIProvider } from 'contexts/ui';
import { PartyProvider } from 'contexts/party';

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
          <PartyProvider>
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
          </PartyProvider>
        </MarketsProvider>
      </WalletProvider>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
