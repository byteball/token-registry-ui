import { AnyAction } from "redux";
import { CHANGE_ACTIVE_SYMBOL } from "../types/active";

const initialState: string | null = null;

export const activeReducer = (
  state: string | null = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case CHANGE_ACTIVE_SYMBOL: {
      return action.payload;
    }
    default:
      return state;
  }
};
