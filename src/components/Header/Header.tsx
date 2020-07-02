import React from "react";
import { Layout, Menu } from "antd";

import styles from "./Header.module.css";
import { AddressSelector } from "../AddressSelector/AddressSelector";

const HeaderAnt = Layout.Header;

export const Header: React.FC = () => {
  return (
    <HeaderAnt className={styles.header}>
      <div className={styles.serviceName}>Token registry<sup> beta</sup></div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        className={styles.menu}
      >
        <Menu.Item key="1">Main</Menu.Item>
      </Menu>
      <div className={styles.selectWrap}>
        <AddressSelector />
      </div>
    </HeaderAnt>
  );
};
