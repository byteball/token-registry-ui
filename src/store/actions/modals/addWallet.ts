import {
  MODAL_CLOSE_ADD_WALLET,
  MODAL_OPEN_ADD_WALLET,
} from "../../types/modals";

export const addWalletOpen = () => ({
  type: MODAL_OPEN_ADD_WALLET,
});

export const addWalletClose = () => ({
  type: MODAL_CLOSE_ADD_WALLET,
});
