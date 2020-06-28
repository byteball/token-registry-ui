import { IStore } from "../reducers/index.interface";
import { ICurrentSymbol } from "./interfaces/currentSymbol.interface";

export const getCurrentFavoriteSymbolList: (
  store: IStore
) => ICurrentSymbol[] = (store: IStore) => {
  const { symbols, supportLinks, assets } = store.data;
  const favoriteSymbols = store.settings.favorites.symbols;
  const result: ICurrentSymbol[] = [];
  for (let symbol in symbols) {
    const { currentAsset, expiry_ts, largestAsset } = symbols[symbol];
    const currentSupport = supportLinks[symbol + "_" + currentAsset];
    const largestSupport = supportLinks[symbol + "_" + largestAsset];
    const expiry_ts_asset = currentAsset
      ? assets[currentAsset].expiry_ts
      : false;
    const isFavorite = favoriteSymbols.find(
      (FavoriteSymbol) => FavoriteSymbol === symbol
    );

    let rivalSupportBySymbol: number | undefined = 0;
    let rivalSupportByAsset: number | undefined = 0;
    let rivalSupport;

    if (expiry_ts) {
      rivalSupportBySymbol = supportLinks[symbol + "_" + largestAsset]?.support;
    }
    if (expiry_ts_asset && currentAsset) {
      const largestSymbol = assets[currentAsset].largestSymbol;
      rivalSupportByAsset =
        supportLinks[largestSymbol + "_" + currentAsset]?.support;
    }
    if (rivalSupportByAsset && rivalSupportBySymbol) {
      rivalSupport = Math.max(rivalSupportByAsset, rivalSupportBySymbol);
    } else if (rivalSupportByAsset) {
      rivalSupport = rivalSupportByAsset;
    } else if (rivalSupportBySymbol) {
      rivalSupport = rivalSupportBySymbol;
    }

    if (
      currentSupport &&
      largestSupport &&
      currentAsset &&
      largestAsset &&
      isFavorite
    ) {
      const current = {
        symbol,
        largestAsset,
        currentAsset,
        expiry_ts_symbol: expiry_ts || null,
        expiry_ts_asset: expiry_ts_asset || null,
        currentSupport: currentSupport.support || 0,
        largestSupport: largestSupport.support || 0,
        isFavorite: !!isFavorite,
        rivalSupport,
      };
      result.push(current);
    }
  }
  return result;
};
