import { REMOVE_FAVORITE_SYMBOL } from "../../types/settings";

export const removeFavoriteSymbol = (symbol: string) => ({
  type: REMOVE_FAVORITE_SYMBOL,
  payload: symbol,
});
