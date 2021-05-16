export interface Key {
  pub: string;
}

export type ID = string;

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface Product {
  settlementAsset: Asset;
}
export interface Instrument {
  name: string;
  code: string;
  product: Product;
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
  updatedAt: string;
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

export interface Account {
  balance: string;
  asset: Asset;
  type: string;
  market: Market;
}
