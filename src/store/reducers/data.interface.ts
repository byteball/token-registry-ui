export interface IActionData {
  type: string;
  payload?: string | number | object | null;
}

export interface IStateVars {
  [key: string]: string;
}

export interface IAssetBalances {
  [key: string]: number;
}

export interface IAsset {
  currentSymbol?: string;
  largestSymbol?: string;
  currentDescHash?: string;
  grace_expiry_ts?: number;
  expiry_ts?: number;
  currentSupport?: number;
  balances?: IAssetBalances;
}

export interface IAssets {
  [key: string]: IAsset;
}

export interface ISymbol {
  currentAsset?: string;
  largestAsset?: string;
  currentSupport?: number;
  expiry_ts?: number;
}

export interface ISymbols {
  [key: string]: ISymbol;
}

export interface IDescriptionSupport {
  [key: string]: number;
}

export interface IDescription {
  decimals?: number;
  text?: string;
  support?: IDescriptionSupport;
}

export interface IDescriptions {
  [key: string]: IDescription;
}

export interface IDrawer {
  asset?: string;
  symbol?: string;
  address?: string;
  drawer?: number;
  support?: number;
  expiry_ts?: number;
}
export interface IDrawersAddress {
  [key: string]: IDrawer;
}
export interface IDrawers {
  [key: string]: IDrawersAddress;
}

export interface ISupportLink {
  support?: number;
  symbol?: string;
  asset?: string;
  lockSupport?: number;
}

export interface ISupportLinks {
  [key: string]: ISupportLink;
}

export interface IDataStore {
  drawers: IDrawers;
  descriptions: IDescriptions;
  assets: IAssets;
  symbols: ISymbols;
  supportLinks: ISupportLinks;
  loaded: boolean;
  loading: boolean;
  error: boolean;
}
