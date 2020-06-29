import React from "react";
import { Spin } from "antd";

import styles from "./Loader.module.css";

export const Loader = () => (
  <div className={styles.Loader}>
    <Spin size="large" />
  </div>
);
