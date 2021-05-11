export interface Key {
  pub: string;
}

export type ID = string;

export interface Instrument {
  name: string;
  code: string;
}

export interface TradableInstrument {
  instrument: Instrument;
}

export interface Market {
  id: ID;
  name: string;
  decimalPlaces: number;
  tradableInstrument: TradableInstrument;
}

export interface Asset {
  name: string;
  symbol: string;
}

export interface Margin {
  asset: Asset;
}

export interface Position {
  market: Market;
  openVolume: number;
  realisedPNL: number;
  unrealisedPNL: number;
  averageEntryPrice: number;
  margins: Margin[];
}

// export enum OrderTimeInForce {
//   FOK,
//   IOC,
//   GTC,
//   GTT,
//   GFA,
//   GFN,
// }

// export enum OrderStatus {
//   Active,
//   Expired,
//   Cancelled,
//   Stopped,
//   Filled,
//   Rejected,
//   PartiallyFilled,
//   Parked,
// }

// export enum Side {
//   Buy,
//   Sell,
// }

// export enum OrderType {
//   MARKET,
//   LIMIT,
//   NETWORK,
// }
// export interface Order {
//   id: ID;
//   price: number;
//   timeInForce: OrderTimeInForce;
//   side: Side;
//   market: Market;
//   size: number;
//   remaining: string;
//   createdAt: string;
//   expiresAt: string;
//   status: OrderStatus;
//   type: OrderType;
// }

export interface Order {
  id: ID;
  price: number;
  timeInForce: string;
  side: string;
  market: Market;
  size: number;
  remaining: string;
  createdAt: string;
  expiresAt: string;
  status: string;
  type: string;
}
