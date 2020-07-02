import moment from "moment";
import { IStore } from "../reducers/index.interface";
import { IDrawersAddress } from "../reducers/data.interface";

export interface ITokenInfo {
  symbol: string;
  currentAsset: string | undefined;
  currentDescription: string | undefined;
  currentSupport: number | undefined;
  currentDecimals: number | undefined;
  drawerSupport: number;
  endDispute: number | null;
  currentDrawers: IDrawersAddress;
  status: status;
}

type status = "dispute" | "normal" | "resolved dispute";

export const getTokenInfoBySymbol: (
  store: IStore,
  symbol: string | null
) => ITokenInfo | undefined = (store: IStore, symbol: string | null) => {
  if (!symbol) return undefined;
  const { symbols, supportLinks, assets, descriptions, drawers } = store.data;
  const symbolInfo = symbols[symbol];
  if (!symbolInfo) return undefined;
  const { currentAsset, largestAsset } = symbolInfo;
  const currentSupport = supportLinks[symbol + "_" + currentAsset]?.support;
  if (!largestAsset || !currentAsset) return undefined;
  const currentDescHash = assets[currentAsset]?.currentDescHash;
  let currentDescription, currentDecimals;
  if (currentDescHash) {
    currentDescription = descriptions[currentDescHash]?.text;
    currentDecimals = descriptions[currentDescHash]?.decimals;
  }
  const expiry_ts_symbol = symbolInfo.expiry_ts || false;
  const expiry_ts_asset = currentAsset ? assets[currentAsset].expiry_ts : false;
  let status: status = "normal";
  let endDispute: number | null = null;
  if (expiry_ts_symbol || expiry_ts_asset) {
    if (expiry_ts_symbol && expiry_ts_asset) {
      endDispute = Math.max(expiry_ts_asset, expiry_ts_symbol);
    } else if (expiry_ts_symbol) {
      endDispute = expiry_ts_symbol;
    } else if (expiry_ts_asset) {
      endDispute = expiry_ts_asset;
    }
  }
  if (endDispute !== null) {
    const now = moment().unix();
    status = now > endDispute ? "resolved dispute" : "dispute";
  }
  const currentDrawers = drawers[symbol + "_" + currentAsset];

  let drawerSupport: number = 0;

  for (let address in currentDrawers) {
    const { drawer, support } = currentDrawers[address];
    if (drawer !== 0 && support) {
      drawerSupport += support;
    }
  }

  return {
    symbol,
    currentAsset,
    currentSupport,
    currentDescription,
    currentDecimals,
    endDispute,
    status,
    currentDrawers,
    drawerSupport,
  };
};
