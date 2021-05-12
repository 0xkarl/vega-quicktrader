import { FC, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { gql, useQuery } from '@apollo/client';

import { Position } from 'vega/types';
import { client } from 'vega/ws';

import { useWallet } from 'hooks/vega-wallet';
import { LG, SM } from 'components/shared/Screen';

const useStyles = makeStyles((theme) => ({
  smPositionRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    '&:not(:first-child)': {
      borderTop: `1px solid ${theme.palette.grey[900]}`,
    },
  },
}));

const QUERY = `
market {
  id
  name
  decimalPlaces
  tradableInstrument {
    instrument {
      code
    }
  }
}
openVolume
realisedPNL
unrealisedPNL
averageEntryPrice
margins {
  asset {
    name
    symbol
  }
}
updatedAt`;

const POSITIONS_QUERY = gql`
  query($partyId: ID!) {
    party(id: $partyId) {
      positions {
        ${QUERY}
      }
    }
  }
`;

const POSITIONS_SUBSCRIPTION = gql`
  subscription($partyId: ID!) {
    positions(partyId: $partyId) {
      ${QUERY}
    }
  }
`;

const Positions: FC = () => {
  const { activeKey } = useWallet();
  return !activeKey ? null : <PositionsQuery {...{ activeKey }} />;
};

const PositionsQuery: FC<{ activeKey: string }> = ({ activeKey }) => {
  const { subscribeToMore, data, loading } = useQuery(POSITIONS_QUERY, {
    variables: { partyId: activeKey },
    client: client,
  });

  const positions: Position[] = data?.party?.positions?.slice() ?? [];

  positions.sort((a: Position, b: Position) => {
    if (a.updatedAt > b.updatedAt) return -1;
    if (a.updatedAt < b.updatedAt) return 1;
    return 0;
  });

  const subscribeToPositionsChange = () =>
    subscribeToMore({
      document: POSITIONS_SUBSCRIPTION,
      variables: { partyId: activeKey },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const positions: Position[] = prev?.party?.positions?.slice() ?? [];

        const position: Position =
          subscriptionData.data.positions[0] ?? subscriptionData.data.positions;

        const idx = positions.findIndex(
          (p: Position) => p.market.id === position.market.id
        );
        if (~idx) {
          positions[idx] = position;
        } else {
          positions.push(position);
        }
        return Object.assign({}, prev, {
          party: { positions },
        });
      },
    });

  return (
    <PositionsSubscribe
      {...{ positions, subscribeToPositionsChange, loading }}
    />
  );
};

const PositionsSubscribe: FC<{
  subscribeToPositionsChange: () => void;
  positions: Position[];
  loading: boolean;
}> = ({ subscribeToPositionsChange, positions, loading }) => {
  const classes = useStyles();

  useEffect(() => {
    subscribeToPositionsChange();
  }, [subscribeToPositionsChange]);

  return (
    <Box p={2}>
      {loading ? (
        <Box>Loading...</Box>
      ) : !positions.length ? (
        <Box>No positions found.</Box>
      ) : (
        <>
          <LG>
            <Table aria-label='Loans' size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell>Market</TableCell>
                  <TableCell>Settled In</TableCell>
                  <TableCell align='right'>Open Volume</TableCell>
                  <TableCell align='right'>Average Entry Price</TableCell>
                  <TableCell align='right'>Mark Price</TableCell>
                  <TableCell align='right'>Allocated Margin</TableCell>
                  <TableCell align='right'>Unrealised PNL</TableCell>
                  <TableCell align='right'>Realised PNL</TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {positions.map((position) => (
                  <TableRow key={position.market.id}>
                    <TableCell component='th' scope='row'>
                      {position.market.tradableInstrument.instrument.code}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>{position.openVolume}</TableCell>
                    <TableCell align='right'>
                      {position.averageEntryPrice /
                        Math.pow(10, position.market.decimalPlaces)}
                    </TableCell>
                    <TableCell align='right'>-</TableCell>
                    <TableCell align='right'>-</TableCell>
                    <TableCell align='right'>
                      {position.unrealisedPNL /
                        Math.pow(10, position.market.decimalPlaces)}
                    </TableCell>
                    <TableCell align='right'>
                      {position.realisedPNL /
                        Math.pow(10, position.market.decimalPlaces)}
                    </TableCell>
                    <TableCell align='right'>-</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </LG>
          <SM>
            {positions.map((position) => (
              <Box
                className={classes.smPositionRow}
                key={position.market.id}
                py={2}
              >
                <Box>Market</Box>
                <Box>{position.market.tradableInstrument.instrument.code}</Box>
                <Box>Volume</Box>
                <Box>{position.openVolume}</Box>
                <Box>Price</Box>
                <Box>
                  {position.averageEntryPrice /
                    Math.pow(10, position.market.decimalPlaces)}
                </Box>
                <Box>Unrealized PNL</Box>
                <Box>
                  {position.unrealisedPNL /
                    Math.pow(10, position.market.decimalPlaces)}
                </Box>
                <Box>Realized PNl</Box>
                <Box>
                  {position.realisedPNL /
                    Math.pow(10, position.market.decimalPlaces)}
                </Box>
              </Box>
            ))}
          </SM>
        </>
      )}
    </Box>
  );
};

export default Positions;
