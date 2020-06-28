import React from "react";
import { Layout } from "antd";

import styles from "./MainLayout.module.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";

const { Content } = Layout;

interface IProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <Layout>
      <Header />
      <Layout className={styles.sidebarWrap}>
        <Sidebar />
        <Layout className={styles.contentWrap}>
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
