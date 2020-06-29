import { ADD_FAVORITE_SYMBOL } from "../../types/settings";

export const addFavoriteSymbol = (symbol: string) => ({
  type: ADD_FAVORITE_SYMBOL,
  payload: symbol,
});
