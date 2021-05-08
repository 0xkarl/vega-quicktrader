import { FC, useState, useRef, useMemo, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';

import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Chart, ChartElement, ChartType, Overlay, Study } from 'pennant';

// import ChartControls from './components/ChartControls';
import { ApolloDataSource } from './data-source/vega-protocol-data-source';
import { Interval } from './api/vega-graphql';

import { useMarkets } from 'hooks/markets';

const httpLink = new HttpLink({
  uri: 'https://lb.testnet.vega.xyz/query',
});

const wsLink = new WebSocketLink({
  uri: 'wss://lb.testnet.vega.xyz/query',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const useStyles = makeStyles((theme) => ({
  container: {
    height: '60vh',
  },
  chart: {
    height: '60vh',

    ' & > *': {
      height: '60vh',
    },
  },
}));

const TradeChart: FC = () => {
  const classes = useStyles();
  const { activeMarketId } = useMarkets();

  const ref = useRef<ChartElement>(null!);
  const [chartType, setChartType] = useState<ChartType>('candle');
  const [study, setStudy] = useState<Study | null>(null);
  const [overlay, setOverlay] = useState<Overlay | null>(null);
  const [interval, setInterval] = useState(Interval.I1H);

  const dataSource = useMemo(
    () => new ApolloDataSource(client, activeMarketId!, '', 5),
    [activeMarketId]
  );

  return !activeMarketId ? null : (
    <Box className={classes.container}>
      {/*
      <div>
        <ChartControls
          interval={interval}
          chartType={chartType}
          overlay={overlay}
          study={study}
          onSetInterval={setInterval}
          onSetChartType={setChartType}
          onSetOverlay={setOverlay}
          onSetStudy={setStudy}
          onSnapshot={async () => {
            // const blob = await ref.current.snapshot();
            // if (blob) {
            //   if (navigator.clipboard) {
            //     await navigator?.clipboard?.write?.([
            //       new ClipboardItem({ 'image/png': blob }),
            //     ]);
            //     AppToaster.show({
            //       intent: Intent.SUCCESS,
            //       message: 'Copied to clipboard',
            //     });
            //   } else {
            //     console.log('Clipboard API not found');
            //   }
            // }
          }}
        />
      </div>
      */}
      <div className={classes.chart}>
        <Chart
          ref={ref}
          dataSource={dataSource}
          options={{
            chartType: chartType,
            studies: study === null ? [] : [study],
            overlays: overlay === null ? [] : [overlay],
          }}
          interval={interval}
          onOptionsChanged={(options) => {
            setStudy(options.studies?.length === 0 ? null : study);
          }}
        />
      </div>
    </Box>
  );
};

export default TradeChart;
