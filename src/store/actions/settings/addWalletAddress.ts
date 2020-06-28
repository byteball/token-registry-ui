import { ADD_WALLET_ADDRESS } from "../../types/settings";

export const addWalletAddress = (address?: string) => ({
  type: ADD_WALLET_ADDRESS,
  payload: address,
});
