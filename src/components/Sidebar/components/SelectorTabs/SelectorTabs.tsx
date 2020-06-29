import { Tabs } from "antd";
import React from "react";
import Scrollbar from "react-scrollbars-custom";
import padEnd from "lodash.padend";

import { TokenHeader } from "../TokenHeader/TokenHeader";
import { TokenItem } from "../TokenItem/TokenItem";

import { ICurrentSymbol } from "store/selectors/interfaces/currentSymbol.interface";
import { ISelectorTabs } from "./SelectorTabs.interface";

const { TabPane } = Tabs;

const truncateSymbolOrAsset = (symbolOrAsset: string, width: number) => {
  if (width <= 480) {
    if (symbolOrAsset.length >= 11) {
      return padEnd(symbolOrAsset.substring(0, 11), 14, "...");
    } else {
      return symbolOrAsset;
    }
  } else {
    if (symbolOrAsset.length >= 18) {
      return padEnd(symbolOrAsset.substring(0, 15), 18, "...");
    } else {
      return symbolOrAsset;
    }
  }
};

export const SelectorTabs: React.FC<ISelectorTabs> = (props) => {
  return (
    <Tabs
      defaultActiveKey="1"
      animated={false}
      tabBarStyle={{
        marginBottom: 0,
        userSelect: "none",
      }}
    >
      <TabPane tab="ALL" key="1" forceRender={true}>
        <TokenHeader />
        <Scrollbar
          style={{
            height: props.height,
          }}
        >
          {props.currentList.map((current) => (
            <TokenItem
              current={current}
              sidebarType={props.sidebarType}
              key={"token-all-" + current.symbol}
              isDispute={Boolean(
                current.expiry_ts_symbol || current.expiry_ts_asset
              )}
              truncatedSymbolOrAsset={
                props.sidebarType === "symbols"
                  ? truncateSymbolOrAsset(current.symbol, props.width)
                  : truncateSymbolOrAsset(current.currentAsset, props.width)
              }
            />
          ))}
        </Scrollbar>
      </TabPane>
      <TabPane tab="FAVORITES" key="2" forceRender={true}>
        <TokenHeader />
        <Scrollbar
          style={{
            height: props.height,
          }}
        >
          {props.currentFavoriteList.map((current) => (
            <TokenItem
              current={current}
              sidebarType={props.sidebarType}
              key={"token-fav-" + current.symbol}
              isDispute={Boolean(
                current.expiry_ts_symbol || current.expiry_ts_asset
              )}
              truncatedSymbolOrAsset={
                props.sidebarType === "symbols"
                  ? truncateSymbolOrAsset(current.symbol, props.width)
                  : truncateSymbolOrAsset(current.currentAsset, props.width)
              }
            />
          ))}
        </Scrollbar>
      </TabPane>
      <TabPane tab="DISPUTED" key="3" forceRender={true}>
        <TokenHeader />
        <Scrollbar
          style={{
            height: props.height,
          }}
        >
          {props.currentDisputeList.map((current: ICurrentSymbol) => (
            <TokenItem
              current={current}
              sidebarType={props.sidebarType}
              key={"token-dis-" + current.symbol}
              isDispute={Boolean(
                current.expiry_ts_symbol || current.expiry_ts_asset
              )}
              truncatedSymbolOrAsset={
                props.sidebarType === "symbols"
                  ? truncateSymbolOrAsset(current.symbol, props.width)
                  : truncateSymbolOrAsset(current.currentAsset, props.width)
              }
            />
          ))}
        </Scrollbar>
      </TabPane>
    </Tabs>
  );
};
