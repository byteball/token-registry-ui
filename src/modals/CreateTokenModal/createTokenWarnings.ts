import { IalertWarnings } from "./CreateTokenModal.interface";

export const alertWarnings: IalertWarnings = {
  symbol: {
    type: "warning",
    text: "This symbol is already taken. This will start a dispute",
  },
  asset: {
    type: "warning",
    text: "This asset is already taken. This will start a dispute",
  },
  all: {
    type: "warning",
    text: "This asset and symbol is already taken. This will start a dispute",
  },
  link: {
    type: "warning",
    text: "This token has already been assigned, you can add support",
  },
  free: {
    type: "success",
    text: "Symbol name and asset is available, you can register token",
  },
};
