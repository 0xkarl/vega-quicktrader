import { FC, useState, useRef, useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';

import { Chart, ChartElement, ChartType, Overlay, Study } from 'pennant';

// import ChartControls from './components/ChartControls';
import { ApolloDataSource } from './data-source/vega-protocol-data-source';
import { Interval } from './api/vega-graphql';

import { useMarkets } from 'contexts/markets';
import { client } from 'vega/ws';

const useStyles = makeStyles(() => ({
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
  const [chartType] = useState<ChartType>('candle');
  const [study, setStudy] = useState<Study | null>(null);
  const [overlay] = useState<Overlay | null>(null);
  const [interval] = useState(Interval.I1H);

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
