import { IDataStore } from "./data.interface";
import { AnyAction } from "redux";
import {
  LOAD_DATA_FAILURE,
  LOAD_DATA_REQUEST,
  LOAD_DATA_SUCCESS,
} from "../types/data";

const initialState: IDataStore = {
  symbols: {},
  assets: {},
  descriptions: {},
  drawers: {},
  supportLinks: {},
  loaded: false,
  loading: false,
  error: false,
};

export const dataReducer = (
  state: IDataStore = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case LOAD_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_DATA_SUCCESS: {
      return {
        symbols: action.payload.symbols,
        assets: action.payload.assets,
        descriptions: action.payload.descriptions,
        drawers: action.payload.drawers,
        supportLinks: action.payload.supportLinks,
        loaded: true,
        loading: false,
      };
    }
    case LOAD_DATA_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: true,
      };
    }
    default:
      return state;
  }
};
