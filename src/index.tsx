import { StrictMode } from 'react';
import { render } from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import { WalletProvider } from 'hooks/vega-wallet';
import { MarketsProvider } from 'hooks/markets';
import App from 'components/global/App';
import theme from 'utils/theme';
import './styles.css';

render(
  <StrictMode>
    <MuiThemeProvider {...{ theme }}>
      <CssBaseline />

      <WalletProvider>
        <MarketsProvider>
          <App />
        </MarketsProvider>
      </WalletProvider>
    </MuiThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
