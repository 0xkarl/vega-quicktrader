import { FC, useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { useWallet } from 'contexts/vega-wallet';
import { useParty } from 'contexts/party';
import { Asset } from 'vega/types';
import { LG, SM } from 'components/shared/Screen';

const useStyles = makeStyles((theme) => ({
  smAccountRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    '&:not(:first-child)': {
      borderTop: `1px solid ${theme.palette.grey[900]}`,
    },
  },
}));

interface Item {
  balance: number;
  asset: Asset;
}

const Wallet: FC = () => {
  const { activeKey } = useWallet();
  return !activeKey ? null : <Accounts />;
};

const Accounts: FC = () => {
  const classes = useStyles();
  const { accounts, isLoadingAccounts: loading } = useParty();

  const data: Item[] = useMemo(() => {
    const m = accounts.reduce((r, a) => {
      r[a.asset.id] = r[a.asset.id] || { asset: a.asset, balance: 0 };
      r[a.asset.id].balance += parseInt(a.balance);
      return r;
    }, {} as Record<string, Item>);
    return Object.values(m);
  }, [accounts]);

  const startDeposit = () => {};
  const startWithdraw = () => {};

  return (
    <Box p={2}>
      {loading ? (
        <Box>Loading...</Box>
      ) : !accounts.length ? (
        <Box>No accounts found.</Box>
      ) : (
        <>
          <LG>
            <Paper>
              <Box p={2}>
                <Table aria-label='Loans' size={'small'}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Asset</TableCell>
                      <TableCell align='right'>Balance</TableCell>
                      <TableCell align='right'></TableCell>
                      <TableCell align='right'></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((account, i) => (
                      <TableRow key={i}>
                        <TableCell>{account.asset.name}</TableCell>
                        <TableCell align='right'>
                          {account.balance /
                            Math.pow(10, account.asset.decimals)}{' '}
                          {account.asset.symbol}
                        </TableCell>
                        <TableCell align='right'>
                          <Button
                            color='secondary'
                            onClick={startDeposit}
                            disabled
                          >
                            Deposit
                          </Button>
                        </TableCell>
                        <TableCell align='right'>
                          <Button
                            color='secondary'
                            onClick={startWithdraw}
                            disabled
                          >
                            Withdraw
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Paper>
          </LG>
          <SM>
            {data.map((account, i) => (
              <Box className={classes.smAccountRow} key={i} py={2}>
                <Box>Asset</Box>
                <Box>{account.asset.name}</Box>
                <Box>Balance</Box>
                <Box>
                  {account.balance / Math.pow(10, account.asset.decimals)}
                </Box>
                <Box>
                  <Button color='secondary' onClick={startDeposit} disabled>
                    Deposit
                  </Button>
                </Box>
                <Box>
                  <Button color='secondary' onClick={startWithdraw} disabled>
                    Withdraw
                  </Button>
                </Box>
              </Box>
            ))}
          </SM>
        </>
      )}
    </Box>
  );
};

export default Wallet;
