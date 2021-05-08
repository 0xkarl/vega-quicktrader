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
