import { CHANGE_ACTIVE_WALLET_ADDRESS } from "../../types/settings";

export const changeActiveWalletAddress = (address?: string) => ({
  type: CHANGE_ACTIVE_WALLET_ADDRESS,
  payload: address,
});
