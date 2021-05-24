import { gql } from '@apollo/client';

const ORDER_QUERY = `
id
price
timeInForce
side
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
remaining
createdAt
expiresAt
status
type
`;

export const ORDERS_QUERY = gql`
query($partyId: ID!) {
  party(id: $partyId) {
    orders {
      ${ORDER_QUERY}
    }
  }
}
`;

export const ORDERS_SUBSCRIPTION = gql`
subscription($partyId: ID!) {
  orders(partyId: $partyId) {
    ${ORDER_QUERY}
  }
}
`;
