import { IStore } from "../reducers/index.interface";
import { IIssuer } from "../reducers/issuers.interface";

export const getCurrentAssetIssuer: (
    store: IStore,
    asset: string | undefined,
) => IIssuer | undefined = (store: IStore, asset) => {
    if (!asset) return undefined;

    if (store.issuers[asset]) {
        return store.issuers[asset];
    } else {
        return undefined;
    }
};