import { MODAL_CLOSE_WITHDRAW, MODAL_OPEN_WITHDRAW } from "../../types/modals";

export const withdrawOpen = () => ({
  type: MODAL_OPEN_WITHDRAW,
});

export const withdrawClose = () => ({
  type: MODAL_CLOSE_WITHDRAW,
});
