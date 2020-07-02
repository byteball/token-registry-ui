import {
  MODAL_CLOSE_EDIT_INFO,
  MODAL_OPEN_EDIT_INFO,
} from "../../types/modals";

export const editInfoOpen = (
  symbol: string | undefined,
  decimals?: number,
  description?: string,
  isEdit?: boolean
) => ({
  type: MODAL_OPEN_EDIT_INFO,
  payload: { symbol, decimals, description, isEdit },
});

export const editInfoClose = () => ({
  type: MODAL_CLOSE_EDIT_INFO,
});
