import config from "../config";
import { encodeData } from "./encodeData";

export const generateLink = (
  amount: number,
  data: object,
  address?: string
): string => {
  const sData = encodeData(data);
  return address
    ? `obyte${config.TESTNET ? "-tn" : ""}:${
        config.ADDRESS
      }?amount=${amount}&base64data=${encodeURIComponent(
        sData
      )}&from_address=${address}`
    : `obyte${config.TESTNET ? "-tn" : ""}:${
        config.ADDRESS
      }?amount=${amount}&base64data=${encodeURIComponent(sData)}`;
};
