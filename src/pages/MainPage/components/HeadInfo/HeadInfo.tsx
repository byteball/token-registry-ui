import React from "react";
import styles from "./HeadInfo.module.css";
import { Space, Statistic } from "antd";
import config from "config";

const { Countdown } = Statistic;
export interface IHeadInfo {
  symbol: string;
  asset: string | undefined;
  status: "dispute" | "normal" | "resolved dispute";
  endDispute: number | null;
  width: number;
}

export const HeadInfo: React.FC<IHeadInfo> = ({
  symbol,
  asset,
  status,
  endDispute,
  width,
}) => {
  const time = endDispute ? endDispute * 1000 : null;
  return (
    <div className={styles.headInfo}>
      <div className={styles.symbolWrap}>
        <h1 className={styles.symbol}>{symbol}</h1>
        <Space size="large" style={{ flexWrap: "wrap" }} direction="horizontal">
          <a
            target="_blank" rel="noopener"
            href={`https://${config.TESTNET ? "testnet" : ""}explorer.obyte.org/${asset}`}
          >
            View asset definition on explorer
          </a>
          <a
            target="_blank" rel="noopener"
            href={`https://${config.TESTNET ? "testnet" : ""}explorer.obyte.org/asset/${symbol}`}
          >
            View token info on explorer
          </a>
        </Space>
      </div>
      {status === "dispute" && time !== null && (
        <div className={styles.disputeTimeWrap}>
          <Countdown
            className={styles.disputeTime}
            valueStyle={{
              fontSize: width > 840 ? 36 : 24,
              fontFamily: "Roboto",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.65)",
            }}
            value={time}
            format="D [days] HH:mm:ss"
          />

          <div>Time until the end of the dispute</div>
        </div>
      )}
    </div>
  );
};
