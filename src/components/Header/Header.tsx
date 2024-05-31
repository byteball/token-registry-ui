import React from "react";
import { Layout, Menu } from "antd";
import { useDispatch } from "react-redux";

import styles from "./Header.module.css";
import { AddressSelector } from "../AddressSelector/AddressSelector";
import { changeActiveSymbol } from "store/actions/active/changeActiveSymbol";

const HeaderAnt = Layout.Header;

export const Header: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <HeaderAnt className={styles.header}>
      <div className={styles.serviceName} onClick={() => dispatch(changeActiveSymbol(null))}>Token registry<sup> beta</sup></div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        className={styles.menu}
      >
        <Menu.Item key="1" onClick={() => dispatch(changeActiveSymbol(null))}>Main</Menu.Item>
      </Menu>
      <div className={styles.selectWrap}>
        <AddressSelector />
      </div>
    </HeaderAnt>
  );
};
