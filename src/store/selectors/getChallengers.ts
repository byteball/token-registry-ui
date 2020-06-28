import { IStore } from "../reducers/index.interface";
import { ISupportLink } from "../reducers/data.interface";

export interface IChallengers {
  bySymbol: ISupportLink[];
  byAsset: ISupportLink[];
}

export const getChallengers: (
  store: IStore,
  currentSymbol: string,
  currentAsset: string
) => IChallengers = (store: IStore, currentSymbol, currentAsset) => {
  const { supportLinks } = store.data;
  const challengers: IChallengers = {
    bySymbol: [],
    byAsset: [],
  };
  for (let link in supportLinks) {
    const { symbol, asset } = supportLinks[link];
    if (asset === currentAsset) {
      challengers.byAsset.push(supportLinks[link]);
    }
    if (symbol === currentSymbol) {
      challengers.bySymbol.push(supportLinks[link]);
    }
  }
  return challengers;
};
