import { Button, Space } from "antd";
import React from "react";
import { useWindowSize } from "hooks/useWindowSize";
import { ButtonLink } from "components/ButtonLink/ButtonLink";
import styles from "./CurrentInfo.module.css";
import { useDispatch } from "react-redux";
import { addSupportOpen } from "store/actions/modals/addSupport";
import { showAllDrawersOpen } from "store/actions/modals/showDrawers";
import { editInfoOpen } from "store/actions/modals/editInfo";
import { IDrawersAddress } from "store/reducers/data.interface";
import { withdrawOpen } from "store/actions/modals/withdraw";
import config from "config";

export interface ICurrentInfo {
  currentSupport: number | undefined;
  decimals: number | undefined;
  description: string | undefined;
  asset: string | undefined;
  symbol: string | undefined;
  drawerSupport: number;
  status: "dispute" | "normal" | "resolved dispute";
  drawers: IDrawersAddress;
  activeWallet: string | undefined;
  isActive?: boolean;
}

export const CurrentInfo: React.FC<ICurrentInfo> = ({
  currentSupport,
  decimals,
  description,
  asset,
  status,
  symbol,
  drawerSupport,
  activeWallet,
  isActive,
}) => {
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  return (
    <Space direction="vertical" size="small" className={styles.currentInfo}>
      <div>
        <b>Current support:</b>{" "}
        <ButtonLink
          onClick={() => {
            dispatch(showAllDrawersOpen("all"));
          }}
        >
          {currentSupport ? currentSupport / 1e9 : "-"} GB
        </ButtonLink>
      </div>
      <div>
        <b>Locked in drawers:</b>{" "}
        {drawerSupport !== 0 ? (
          <ButtonLink
            onClick={() => {
              dispatch(showAllDrawersOpen("lock"));
            }}
          >
            {drawerSupport / 1e9 + " GB"}
          </ButtonLink>
        ) : (
          0
        )}
      </div>
      <div>
        <b>Current asset:</b>{" "}
        {asset ? (
          <a
            target="_blank" rel="noopener"
            href={`https://${config.TESTNET ? "testnet" : ""}explorer.obyte.org/?#${asset}`}
          >
            {asset}
          </a>
        ) : (
          "-"
        )}
      </div>

      <div>
        <Space size="large">
          <div>
            <b>Decimals:</b> {decimals !== undefined ? decimals : "-"}
          </div>
          <div>
            <b>Status:</b>{" "}
            <span style={{ color: status === "normal" ? "green" : "red" }}>
              {status}
            </span>
          </div>
        </Space>
      </div>
      <div>
        <div>
          <b>Description:</b>
        </div>
        <span>{description || "-"}</span>
      </div>
      <div>
        <Space
          direction={width > 840 ? "horizontal" : "vertical"}
          size="middle"
        >
          {symbol !== undefined && asset !== undefined && (
            <Button
              size="large"
              type="primary"
              onClick={() => dispatch(addSupportOpen(symbol, asset))}
            >
              Add support to the current connection
            </Button>
          )}
          <Button
            size="large"
            disabled={!!description || !!decimals || !isActive}
            onClick={() => dispatch(editInfoOpen(symbol))}
          >
            Add description and decimals
          </Button>
          {activeWallet && (
            <Button
              size="large"
              type="primary"
              danger
              onClick={() => dispatch(withdrawOpen())}
            >
              Withdraw support
            </Button>
          )}
        </Space>
      </div>
    </Space>
  );
};
