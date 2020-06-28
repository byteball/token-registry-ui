import { IStore } from "../reducers/index.interface";
import { IDrawer } from "../reducers/data.interface";
export interface INewData {
  bySymbol: IDrawer[];
  byAsset: IDrawer[];
}
export const getDrawersByAddress: (
  store: IStore,
  address?: string,
  asset?: string,
  symbol?: string
) => INewData | undefined = (store: IStore, address, asset, symbol) => {
  if (!symbol || !address || !asset) return undefined;
  const newData: INewData = { byAsset: [], bySymbol: [] };
  const { drawers } = store.data;
  for (let drawer in drawers) {
    for (let link in drawers[drawer]) {
      const [addressDrawer] = link.split("_");
      if (address === addressDrawer) {
        if (drawers[drawer][link].asset === asset) {
          newData.byAsset.push(drawers[drawer][link]);
        }
        if (drawers[drawer][link].symbol === symbol) {
          newData.bySymbol.push(drawers[drawer][link]);
        }
      }
    }
  }
  return newData;
};
