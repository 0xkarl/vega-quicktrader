import { gql } from '@apollo/client';

const ACCOUNT_QUERY = `
balance
type
asset {
  id
  name
  symbol
  decimals
}
market {
  id
  name
  decimalPlaces
  tradableInstrument {
    instrument {
      code
    }
  }
}`;

export const ACCOUNTS_QUERY = gql`
  query($partyId: ID!) {
    party(id: $partyId) {
      accounts {
        ${ACCOUNT_QUERY}
      }
    }
  }
`;

export const ACCOUNTS_SUBSCRIPTION = gql`
  subscription($partyId: ID!) {
    accounts(partyId: $partyId) {
      ${ACCOUNT_QUERY}
    }
  }
`;
