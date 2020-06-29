export interface ICurrentSymbol {
  symbol: string;
  largestAsset: string;
  currentAsset: string;
  expiry_ts_symbol: number | null;
  expiry_ts_asset: number | null;
  currentSupport: number;
  largestSupport: number;
  isFavorite: boolean;
  rivalSupport?: number | null;
}
