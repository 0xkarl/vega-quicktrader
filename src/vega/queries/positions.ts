import { gql } from '@apollo/client';

const POSITION_QUERY = `
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
}`;

export const POSITIONS_QUERY = gql`
  query($partyId: ID!) {
    party(id: $partyId) {
      positions {
        ${POSITION_QUERY}
      }
    }
  }
`;

export const POSITIONS_SUBSCRIPTION = gql`
  subscription($partyId: ID!) {
    positions(partyId: $partyId) {
      ${POSITION_QUERY}
    }
  }
`;
