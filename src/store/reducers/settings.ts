import { AnyAction } from "redux";

import { ISettingsStore } from "./settings.interface";
import {
  ADD_FAVORITE_SYMBOL,
  ADD_WALLET_ADDRESS,
  CHANGE_ACTIVE_WALLET_ADDRESS,
  CHANGE_SIDEBAR_SORT_TYPE,
  CHANGE_SIDEBAR_TYPE,
  REMOVE_FAVORITE_SYMBOL,
} from "../types/settings";

const initialState: ISettingsStore = {
  favorites: {
    symbols: [],
  },
  activeWallet: undefined,
  wallets: [],
  sidebarType: "symbols",
  sort: {
    sidebar: "AZ",
  },
};

export const settingsReducer = (
  state: ISettingsStore = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case ADD_FAVORITE_SYMBOL: {
      if (state.favorites.symbols.find((symbol) => symbol === action.payload)) {
        return state;
      }
      return {
        ...state,
        favorites: {
          ...state.favorites,
          symbols: [...state.favorites.symbols, action.payload],
        },
      };
    }
    case REMOVE_FAVORITE_SYMBOL: {
      const newFavoriteSymbols = state.favorites.symbols.filter(
        (symbol) => symbol !== action.payload
      );
      return {
        ...state,
        favorites: {
          ...state.favorites,
          symbols: newFavoriteSymbols,
        },
      };
    }

    case CHANGE_SIDEBAR_TYPE: {
      return {
        ...state,
        sidebarType: action.payload,
      };
    }

    case CHANGE_SIDEBAR_SORT_TYPE: {
      return {
        ...state,
        sort: {
          ...state.sort,
          sidebar: action.payload,
        },
      };
    }
    case ADD_WALLET_ADDRESS: {
      if (!state.wallets.find((w) => w === action.payload)) {
        return {
          ...state,
          wallets: [...state.wallets, action.payload],
          activeWallet: action.payload,
        };
      } else {
        return state;
      }
    }
    case CHANGE_ACTIVE_WALLET_ADDRESS: {
      return {
        ...state,
        activeWallet: action.payload,
      };
    }
    default:
      return state;
  }
};
