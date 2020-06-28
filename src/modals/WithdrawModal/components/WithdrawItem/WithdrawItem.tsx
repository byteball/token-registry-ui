import React from "react";
import { Statistic } from "antd";
import moment from "moment";

import styles from "./WithdrawItem.module.css";

export interface IWithdrawItem {
  readonly active: boolean;
  readonly symbol: string;
  readonly asset: string;
  readonly drawer: number;
  readonly support: number;
  readonly expiry_ts?: number;
  readonly currentSymbol?: string;
  onChangeActive: any;
}

const { Countdown } = Statistic;

export const WithdrawItem: React.FC<IWithdrawItem> = ({
  active,
  symbol,
  asset,
  drawer,
  support,
  expiry_ts,
  onChangeActive,
}) => (
  <div
    className={active ? styles.item + " " + styles.active : styles.item}
    onClick={onChangeActive}
  >
    <div className={styles.symbol}>
      Symbol: <span>{symbol}</span>
    </div>
    <div className={styles.asset}>
      Asset: <span>{asset}</span>
    </div>
    <div className={styles.drawerWrap}>
      <div className={styles.drawer}>
        Drawer: <span>{drawer} days</span>
      </div>
      <div className={styles.support}>
        Support: <span>{support / 1e9} GB</span>
      </div>
    </div>
    {expiry_ts && (
      <div>
        {moment.unix(expiry_ts).isAfter() ? (
          <Countdown
            style={{ display: "inline" }}
            valueStyle={{ fontSize: 14, color: active ? "#fff" : "red" }}
            value={expiry_ts * 1000}
            format="[Will unlock in ] D [days] HH:mm:ss"
          />
        ) : (
          <span className={styles.expiry}>Drawer is unlocked</span>
        )}
      </div>
    )}
  </div>
);
