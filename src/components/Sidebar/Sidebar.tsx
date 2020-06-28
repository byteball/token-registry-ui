import React, { useState, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import styles from "./Sidebar.module.css";
import { useWindowSize } from "hooks/useWindowSize";
import { Search } from "./components/Search/Search";
import { SelectorTabs } from "./components/SelectorTabs/SelectorTabs";
import { HeaderSidebar } from "./components/HeaderSidebar/HeaderSidebar";
import useThrottledEffect from "hooks/useThrottledEffect";

import { getCurrentSymbolList } from "store/selectors/getCurrentSymbolList";
import { IStore } from "store/reducers/index.interface";
import { getCurrentDisputeSymbolList } from "store/selectors/getCurrentDisputeSymbolList";
import { getCurrentFavoriteSymbolList } from "store/selectors/getCurrentFavoriteSymbolList";
import { ICurrentSymbol } from "store/selectors/interfaces/currentSymbol.interface";
import { ISettingsStore } from "store/reducers/settings.interface";

const { Sider } = Layout;

interface ISidebar {
  children?: ReactNode;
}

const filterSymbols = (current: ICurrentSymbol, search: string) => {
  return (
    current.symbol.indexOf(search.toUpperCase()) !== -1 ||
    current.currentAsset.indexOf(search) !== -1
  );
};

export const Sidebar: React.FC<ISidebar> = () => {
  const [width, height] = useWindowSize();
  const wrapperHeadSidebar = useRef<HTMLDivElement>(null);
  const [isCollapse, setCollapse] = useState(false);
  const [selectorHeight, setSelectorHeight] = useState(0);
  const [search, setSearch] = useState("");
  const settings = useSelector<IStore, ISettingsStore>(
    (state) => state.settings
  );
  const sortSymbols: any = (a: ICurrentSymbol, b: ICurrentSymbol) => {
    if (settings.sort.sidebar === "AZ") {
      if (a.symbol > b.symbol) {
        return 1;
      } else if (a.symbol < b.symbol) {
        return -1;
      } else {
        return 0;
      }
    } else {
      if (a.currentSupport < b.currentSupport) {
        return 1;
      } else if (a.currentSupport > b.currentSupport) {
        return -1;
      } else {
        return 0;
      }
    }
  };

  const currentSymbolList: ICurrentSymbol[] = useSelector(getCurrentSymbolList)
    .filter((current) => filterSymbols(current, search))
    .sort((a, b) => sortSymbols(a, b));

  const currentDisputeSymbolList: ICurrentSymbol[] = useSelector(
    getCurrentDisputeSymbolList
  )
    .filter((current) => filterSymbols(current, search))
    .sort((a, b) => sortSymbols(a, b));

  const currentFavoriteSymbolList: ICurrentSymbol[] = useSelector(
    getCurrentFavoriteSymbolList
  )
    .filter((current) => filterSymbols(current, search))
    .sort((a, b) => sortSymbols(a, b));

  let sidebarWidth: number = 400;

  if (width >= 480) {
    sidebarWidth = 400;
  } else if (width < 480) {
    sidebarWidth = 280;
  }

  useThrottledEffect(
    () => {
      if (wrapperHeadSidebar.current) {
        if (wrapperHeadSidebar.current.clientHeight) {
          if (width > 1200) {
            setSelectorHeight(
              height -
                wrapperHeadSidebar.current.clientHeight -
                (64 + 48 + 48 + 48 + 24)
            );
          } else {
            setSelectorHeight(
              height - wrapperHeadSidebar.current.clientHeight - (64 + 48 + 48)
            );
          }
        }
      }
    },
    500,
    [
      height,
      width,
      setSelectorHeight,
      wrapperHeadSidebar,
      document.body.scrollHeight,
    ]
  );

  return (
    <Sider
      width={sidebarWidth}
      breakpoint="xl"
      collapsedWidth="0"
      collapsible={isCollapse}
      theme="light"
      onCollapse={(data) => {
        setCollapse(data);
      }}
      className={styles.sider}
    >
      {!isCollapse && width < 1200 && (
        <Overlay>
          <div className={styles.overlay} />
        </Overlay>
      )}
      <div
        className={styles.siderWrap}
        style={{
          minWidth: sidebarWidth,
          opacity: isCollapse ? 0 : 1,
        }}
      >
        <div ref={wrapperHeadSidebar}>
          <HeaderSidebar />
          <Search value={search} onChange={setSearch} />
        </div>
        <div className={styles.selectorWrap}>
          <SelectorTabs
            sidebarType={settings.sidebarType}
            currentList={currentSymbolList}
            currentDisputeList={currentDisputeSymbolList}
            currentFavoriteList={currentFavoriteSymbolList}
            height={selectorHeight}
            width={width}
          />
        </div>
      </div>
    </Sider>
  );
};

const portalDom: HTMLElement = document.getElementById("portal")!;

const Overlay = (props: any) => createPortal(props.children, portalDom);
