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

export interface Trade {
  id: ID;
  market: Market;
  price: number;
  size: number;
  createdAt: string;
}
