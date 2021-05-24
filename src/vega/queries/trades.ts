import { gql } from '@apollo/client';

const TRADE_QUERY = `
id
price
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
size
createdAt
`;

export const TRADES_QUERY = gql`
query($partyId: ID!) {
  party(id: $partyId) {
    trades {
      ${TRADE_QUERY}
    }
  }
}
`;

export const TRADES_SUBSCRIPTION = gql`
subscription($partyId: ID!) {
  trades(partyId: $partyId) {
    ${TRADE_QUERY}
  }
}
`;
