import { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import { useParty } from 'contexts/party';
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

const Positions: FC = () => {
  const classes = useStyles();
  const { positions, isLoadingPositions } = useParty();

  return (
    <Box p={2}>
      {isLoadingPositions ? (
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
                    <TableCell align='right'>{position.openVolume}</TableCell>
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
                    <TableCell align='right'>
                      <Button
                        color='secondary'
                        variant='contained'
                        disabled
                        size='small'
                        onClick={() => {}}
                      >
                        close
                      </Button>
                    </TableCell>
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
