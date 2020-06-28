import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

import styles from "./HeaderSidebar.module.css";
import { createTokenOpen } from "store/actions/modals/createToken";

export const HeaderSidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.headerSidebar}>
      <div className={styles.title}>Token list</div>
      <div>
        <Button size="large" onClick={() => dispatch(createTokenOpen())}>
          CREATE
        </Button>
      </div>
    </div>
  );
};
