export interface ISort {
  sidebar: "AZ" | "SUPPORT";
}

export interface ISettingsStore {
  favorites: {
    symbols: string[];
  };
  sidebarType: "assets" | "symbols";
  sort: ISort;
  activeWallet: string | undefined;
  wallets: string[];
}
