import { StrictMode } from 'react';
import { render } from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { WalletProvider } from 'hooks/vega-wallet';
import { MarketsProvider } from 'hooks/markets';
import { UIProvider } from 'hooks/ui';

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
            <App />
          </UIProvider>
        </MarketsProvider>
      </WalletProvider>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
