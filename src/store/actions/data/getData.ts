import config from "config";

import {
  LOAD_DATA_FAILURE,
  LOAD_DATA_REQUEST,
  LOAD_DATA_SUCCESS,
} from "store/types/data";

import { ThunkActionWithArguments } from "../index.interface";
import {
  IAssets,
  ISymbols,
  IDescriptions,
  IDrawers,
  ISupportLinks,
} from "store/reducers/data.interface";
import { regSymbol } from "../../../utils/regSymbol";

export interface IStateVars {
  [key: string]: string;
}

export const getData: ThunkActionWithArguments = () => async (
  dispatch,
  getState,
  socket
) => {
  dispatch({
    type: LOAD_DATA_REQUEST,
  });

  await socket.justsaying("light/new_aa_to_watch", {
    aa: config.ADDRESS,
  });

  const alphabetAndNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  let by_largest_a2s: IStateVars,
    by_largest_s2a: IStateVars,
    a2s: IStateVars,
    s2a: IStateVars,
    decimals: IStateVars,
    desc_support: IStateVars = {},
    current_desc: IStateVars = {},
    desc: IStateVars,
    support: IStateVars,
    balance: IStateVars,
    grace_expiry_ts: IStateVars,
    expiry_ts: IStateVars = {},
    _expiry_ts: IStateVars = {},
    drawersList: IStateVars = {};

  try {
    by_largest_a2s = (await socket.api.getAaStateVars({
      address: config.ADDRESS,
      var_prefix: "by_largest_a2s_"
    })) as IStateVars;

    by_largest_s2a = (await socket.api.getAaStateVars({
      address: config.ADDRESS,
      var_prefix: "by_largest_s2a_"
    })) as IStateVars;

    a2s = (await socket.api.getAaStateVars({
      address: config.ADDRESS,
      var_prefix: "a2s_"
    })) as IStateVars;

    s2a = (await socket.api.getAaStateVars({
      address: config.ADDRESS,
      var_prefix: "s2a_"
    })) as IStateVars;

    decimals = (await socket.api.getAaStateVars({
      address: config.ADDRESS,
      var_prefix: "decimals_"
    })) as IStateVars;

    desc_support = (await socket.api.getAaStateVars({
      address: config.ADDRESS,
      var_prefix: "desc_support_"
    })) as IStateVars;

    current_desc = (await socket.api.getAaStateVars({
      address: config.ADDRESS,
      var_prefix: "current_desc_"
    })) as IStateVars;

    desc = (await socket.api.getAaStateVars({
      address: config.ADDRESS,
      var_prefix: "desc_"
    })) as IStateVars;

    support = (await socket.api.getAaStateVars({
      address: config.ADDRESS,
      var_prefix: "support_"
    })) as IStateVars;

    balance = (await socket.api.getAaStateVars({
      address: config.ADDRESS,
      var_prefix: "balance_"
    })) as IStateVars;

    grace_expiry_ts = (await socket.api.getAaStateVars({
      address: config.ADDRESS,
      var_prefix: "grace_expiry_ts_"
    })) as IStateVars;

    expiry_ts = (await socket.api.getAaStateVars({
      address: config.ADDRESS,
      var_prefix: "expiry_ts_"
    })) as IStateVars;

    const getDrawers = alphabetAndNumbers.map((var_prefix) => {
      return socket.api.getAaStateVars({
        address: config.ADDRESS,
        var_prefix
      }).then((data: any) => {
        for (const row in data) {
          if (row.includes("_expiry_ts")) {
            _expiry_ts = { ..._expiry_ts, [row]: data[row] };
          } else {
            drawersList = { ...drawersList, [row]: data[row] };
          }
        }
        return data;
      });
    });

    await Promise.all(getDrawers);
  } catch (e) {
    console.log("Error: ", e);
    return dispatch({
      type: LOAD_DATA_FAILURE,
    });
  }

  const assets: IAssets = {};
  const descriptions: IDescriptions = {};
  const symbols: ISymbols = {};
  const drawers: IDrawers = {};
  const supportLinks: ISupportLinks = {};

  for (const row in by_largest_a2s) {
    const asset = row.split("_").slice(3)[0];
    if (!(asset in assets)) assets[asset] = {};
    assets[asset].largestSymbol = by_largest_a2s[row];
  }

  for (const row in by_largest_s2a) {
    const dataRow = row.split("_").slice(3);
    let oSymbol = [];
    for (let i = 0; i < dataRow.length; i++) {
      oSymbol.push(dataRow[i]);
    }
    const symbol = oSymbol.join("_");
    if (!(symbol in symbols)) symbols[symbol] = {};
    symbols[symbol].largestAsset = by_largest_s2a[row];
  }

  for (const row in a2s) {
    const asset = row.split("_").slice(1)[0];
    if (!(asset in assets)) assets[asset] = {};
    assets[asset].currentSymbol = a2s[row];
  }

  for (const row in s2a) {
    const dataRow = row.split("_").slice(1);
    let oSymbol = [];
    for (let i = 0; i < dataRow.length; i++) {
      oSymbol.push(dataRow[i]);
    }
    const symbol = oSymbol.join("_");
    if (!(symbol in symbols)) symbols[symbol] = {};
    symbols[symbol].currentAsset = s2a[row];
  }

  for (const row in decimals) {
    const hash = row.split("_").slice(1)[0];
    const decimal: number = Number(decimals[row]);
    if (!(hash in descriptions)) descriptions[hash] = {};
    descriptions[hash].decimals = decimal;
  }

  for (const row in desc_support) {
    const assetAndHash = row.split("_").slice(2);
    const [asset, hash] = assetAndHash;
    const support: number = Number(desc_support[row]);
    if (!(hash in descriptions)) descriptions[hash] = {};
    if (!("support" in descriptions[hash])) {
      descriptions[hash].support = {};
    }
    descriptions[hash].support = {
      ...descriptions[hash].support,
      [asset]: support,
    };
  }

  for (const row in current_desc) {
    const asset = row.split("_").slice(2)[0];
    if (!(asset in assets)) assets[asset] = {};
    assets[asset].currentDescHash = current_desc[row];
  }

  for (const row in desc) {
    const hash = row.split("_").slice(1)[0];
    if (!(hash in descriptions)) descriptions[hash] = {};
    descriptions[hash].text = desc[row];
  }

  for (const row in support) {
    const symbAndAsset = row.split("_").slice(1);
    const asset = symbAndAsset[symbAndAsset.length - 1];
    let oSymbol = [];
    for (let i = 0; i < symbAndAsset.length - 1; i++) {
      oSymbol.push(symbAndAsset[i]);
    }
    const symbol = oSymbol.join("_");
    const link = symbol + "_" + asset;
    if (!(link in supportLinks)) supportLinks[link] = {};
    supportLinks[link] = { support: Number(support[row]), asset, symbol };
  }

  for (const row in balance) {
    const AdrAndAsset = row.split("_").slice(1);
    const [address, asset] = AdrAndAsset;
    const new_balance: number = Number(balance[row]);
    if (!(asset in assets)) assets[asset] = {};
    assets[asset].balances = {
      ...assets[asset].balances,
      [address]: new_balance,
    };
  }

  for (const row in grace_expiry_ts) {
    const asset = row.split("_").slice(3)[0];
    if (!(asset in assets)) assets[asset] = {};
    assets[asset].grace_expiry_ts = Number(grace_expiry_ts[row]);
  }

  for (const row in drawersList) {
    const dataRow = row.split("_");
    const address = dataRow[0];
    const drawer = Number(dataRow[1]);
    const asset = dataRow[dataRow.length - 1];
    let oSymbol = [];
    for (let i = 2; i < dataRow.length - 1; i++) {
      oSymbol.push(dataRow[i]);
    }
    const symbol = oSymbol.join("_");
    const link = symbol + "_" + asset;
    const support = Number(drawersList[row]);
    drawers[link] = {
      ...drawers[link],
      [address + "_" + drawer]: { drawer, asset, symbol, support, address },
    };
  }

  for (const row in _expiry_ts) {
    const dataRow = row.split("_").slice(0, 4);
    const address = dataRow[0];
    const drawer = dataRow[1];
    const asset = dataRow[dataRow.length - 1];
    let oSymbol = [];
    for (let i = 2; i < dataRow.length - 1; i++) {
      oSymbol.push(dataRow[i]);
    }
    const symbol = oSymbol.join("_");
    const link = symbol + "_" + asset;
    drawers[link] = {
      ...drawers[link],
      [address + "_" + drawer]: {
        ...drawers[link][address + "_" + drawer],
        expiry_ts: Number(_expiry_ts[row]),
      },
    };
  }

  for (const row in expiry_ts) {
    const symbolOrAsset = row.split("_").slice(2)[0];
    if (symbolOrAsset.length === 44) {
      if (!(symbolOrAsset in assets)) assets[symbolOrAsset] = {};
      assets[symbolOrAsset].expiry_ts = Number(expiry_ts[row]);
    } else {
      const dataRow = row.split("_").slice(2);
      let oSymbol = [];
      for (let i = 0; i < dataRow.length; i++) {
        oSymbol.push(dataRow[i]);
      }
      const symbol = oSymbol.join("_");
      if (!(symbol in symbols)) symbols[symbol] = {};
      symbols[symbol].expiry_ts = Number(expiry_ts[row]);
    }
  }

  for (let symbol in symbols) {
    if (!regSymbol.test(symbol)) {
      delete symbols[symbol];
    }
  }

  for (let drawer in drawers) {
    const currentDrawerByAddress = drawers[drawer];
    for (let link in currentDrawerByAddress) {
      const currentDrawer = currentDrawerByAddress[link];
      if (currentDrawer.drawer !== 0) {
        const { asset, symbol } = currentDrawer;
        const supportLinkKey = symbol + "_" + asset;
        const currentSupportLink = supportLinks[supportLinkKey];
        if (currentSupportLink && currentDrawer.support)
          if (currentSupportLink.lockSupport !== undefined) {
            currentSupportLink.lockSupport += currentDrawer.support;
          } else {
            currentSupportLink.lockSupport = currentDrawer.support;
          }
      }
    }
  }

  dispatch({
    type: LOAD_DATA_SUCCESS,
    payload: { drawers, symbols, assets, descriptions, supportLinks },
  });
};
