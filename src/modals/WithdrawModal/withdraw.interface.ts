import React from "react";

export interface IDataWithdraw {
  withdraw?: 1;
  asset?: string;
  symbol?: string;
  drawer?: number;
  move?: 1;
  amount?: number;
  address?: string;
}

export interface IWithdrawModal {
  readonly currentAddress?: string | undefined;
  readonly currentAsset?: string;
  readonly currentSymbol?: string;
  readonly children?: React.ReactNode;
}

export interface IDataDrawer {
  readonly symbol?: string;
  readonly asset?: string;
  readonly support?: number;
  readonly drawer?: number;
  readonly expireAt?: number;
}
