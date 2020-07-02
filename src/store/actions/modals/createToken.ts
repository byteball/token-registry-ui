import {
  MODAL_CLOSE_CREATE_TOKEN,
  MODAL_OPEN_CREATE_TOKEN,
  MODAL_CHECK_CREATE_TOKEN,
  MODAL_CLEAR_CREATE_TOKEN,
} from "../../types/modals";

import { ThunkActionWithArguments } from "../index.interface";
import { IStore } from "../../reducers/index.interface";
export interface IcreateTokenOpen {
  asset?: string;
  symbol?: string;
}
export const createTokenOpen = (payload?: IcreateTokenOpen) => ({
  type: MODAL_OPEN_CREATE_TOKEN,
  payload: payload,
});

export const createTokenClose = () => ({
  type: MODAL_CLOSE_CREATE_TOKEN,
});

export const createTokenClear = () => ({
  type: MODAL_CLEAR_CREATE_TOKEN,
});

export const createTokenCheck: ThunkActionWithArguments = (
  symbol,
  asset
) => async (dispatch, getState) => {
  const store = getState() as IStore;
  const { symbols, assets, supportLinks } = store.data;
  const largestAsset = symbols[symbol]?.largestAsset;
  const largestSymbol = assets[asset]?.largestSymbol;

  const largestAssetSupport =
    supportLinks[symbol + "_" + largestAsset]?.support;

  const largestSymbolSupport =
    supportLinks[largestSymbol + "_" + asset]?.support;

  let riverSupport =
    largestAssetSupport && largestSymbolSupport
      ? Math.max(largestAssetSupport, largestSymbolSupport)
      : largestAssetSupport || largestSymbolSupport;
  riverSupport = riverSupport ? riverSupport + 1e8 : 1e8;

  let status;
  if (supportLinks[symbol + "_" + asset]) {
    status = "link";
  } else if (symbol in symbols && asset in assets) {
    status = "all";
  } else if (symbol in symbols) {
    status = "symbol";
  } else if (asset in assets) {
    status = "asset";
  } else {
    status = "free";
  }
  dispatch({
    type: MODAL_CHECK_CREATE_TOKEN,
    payload: status,
    meta: status !== "link" ? riverSupport : null,
  });
};
