export interface ICreateTokenModal {
  symbol?: string;
  asset?: string;
  activeWallet?: string;
}

export interface ICreateTokenData {
  symbol: string;
  asset: string;
  drawer: number;
  decimals?: number;
  description?: string;
}

export type IalertWarnings = {
  [key in "symbol" | "asset" | "all" | "link" | "free"]: {
    type: "success" | "info" | "warning" | "error";
    text: string;
  };
};
