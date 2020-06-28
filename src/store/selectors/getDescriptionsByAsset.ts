import { IStore } from "../reducers/index.interface";

export interface IDescriptionsByAsset {
  text?: string;
  support: number;
  asset?: string;
  decimals?: number;
  symbol: string;
}

export const getDescriptionsByAsset: (
  store: IStore,
  asset: string,
  symbol: string
) => IDescriptionsByAsset[] = (store: IStore, asset, symbol) => {
  const descriptionsList: IDescriptionsByAsset[] = [];
  const { descriptions } = store.data;
  for (let description in descriptions) {
    if (
      descriptions[description].support !== undefined &&
      asset in descriptions[description]?.support
    ) {
      descriptionsList.push({
        text: descriptions[description].text,
        support: descriptions[description].support![asset],
        decimals: descriptions[description].decimals,
        asset,
        symbol,
      });
    }
  }
  return descriptionsList;
};
