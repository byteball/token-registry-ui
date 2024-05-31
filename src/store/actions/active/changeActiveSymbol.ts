import { CHANGE_ACTIVE_SYMBOL } from "store/types/active";
import historyInstance from "historyInstance";
import { ThunkActionWithArguments } from "../index.interface";
import { IStore } from "store/reducers/index.interface";
import { addIssuer } from "../issuers/addIssuer";
import { botCheck } from "utils/botCheck";

export const changeActiveSymbol: ThunkActionWithArguments = (
  symbol: string | null
) => async (dispatch, getState) => {
  if (!symbol) {
    historyInstance.push("/");
    dispatch({
      type: CHANGE_ACTIVE_SYMBOL,
      payload: null,
    });
  } else {
    historyInstance.replace("/" + symbol);

    const store = getState() as IStore;
    const asset = store?.data?.symbols?.[symbol]?.currentAsset;

    dispatch({
      type: CHANGE_ACTIVE_SYMBOL,
      payload: symbol,
    });

    if (asset) {
      dispatch(addIssuer(asset, botCheck()));
    }
  }
};
