import {
  MODAL_CLOSE_ADD_SUPPORT,
  MODAL_OPEN_ADD_SUPPORT,
} from "../../types/modals";

export const addSupportOpen = (symbol: string, asset: string) => ({
  type: MODAL_OPEN_ADD_SUPPORT,
  payload: { symbol, asset },
});

export const addSupportClose = () => ({
  type: MODAL_CLOSE_ADD_SUPPORT,
});
