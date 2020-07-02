import { CHANGE_ACTIVE_SYMBOL } from "store/types/active";
import historyInstance from "historyInstance";

export const changeActiveSymbol = (symbol: string) => {
  historyInstance.replace("/" + symbol);
  return {
    type: CHANGE_ACTIVE_SYMBOL,
    payload: symbol,
  };
};
