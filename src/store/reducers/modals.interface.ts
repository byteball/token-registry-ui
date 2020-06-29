export interface IActionModals {
  type: string;
  payload?: string | number | object | null;
}

export interface IModals {
  visible: boolean;
  loading: boolean;
}

export interface IModalsCreateToken extends IModals {
  check: null | "free" | "asset" | "symbol" | "link" | "all";
  minSupport?: number | undefined;
  symbol?: string;
  asset?: string;
}

export interface IModalAddSupport extends IModals {
  symbol: string | undefined;
  asset: string | undefined;
}

export interface IModalShowDrawers extends IModals {
  type: "all" | "lock" | undefined;
}

export interface IModalEditInfo extends IModals {
  symbol: string | undefined;
  decimals?: number;
  description?: string;
  isEdit?: boolean;
}

export interface IModalsStore {
  createToken: IModalsCreateToken;
  addSupport: IModalAddSupport;
  showDrawers: IModalShowDrawers;
  editInfo: IModalEditInfo;
  addWallet: IModals;
  withdraw: IModals;
}
