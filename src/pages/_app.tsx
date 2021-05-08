import { FC, useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import theme from 'utils/theme';
import 'styles.css';

import { WalletProvider } from 'hooks/vega-wallet';
import { MarketsProvider } from 'hooks/markets';

import AppLayout from 'components/global/App';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <title>Vega QuickTrader</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <MuiThemeProvider {...{ theme }}>
        <CssBaseline />

        <WalletProvider>
          <MarketsProvider>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </MarketsProvider>
        </WalletProvider>
      </MuiThemeProvider>
    </>
  );
};

export default App;
