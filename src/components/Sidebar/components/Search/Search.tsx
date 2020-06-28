import React from "react";
import { Button, Input } from "antd";
import { SortAscendingOutlined, FallOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { IStore } from "store/reducers/index.interface";
import { ISort } from "store/reducers/settings.interface";
import { changeSidebarSortType } from "store/actions/settings/changeSidebarSortType";
import styles from "./Search.module.css";

export interface ISearch {
  value: string;
  onChange: (search: string) => any;
}

export const Search: React.FC<ISearch> = (props) => {
  const sort = useSelector<IStore, ISort>((state) => state.settings.sort);
  const dispatch = useDispatch();
  return (
    <div className={styles.search}>
      <div className={styles.inputWrap}>
        <Input
          allowClear
          className={styles.input}
          value={props.value}
          onChange={(ev) => props.onChange(ev.target.value)}
          placeholder="Search... (asset or symbol)"
        />
      </div>
      <div className={styles.switchers}>
        {sort.sidebar === "SUPPORT" ? (
          <Button
            type={"ghost"}
            onClick={() => dispatch(changeSidebarSortType("AZ"))}
            icon={<SortAscendingOutlined className={styles.switchersBtn} />}
          />
        ) : (
          <Button
            type={"ghost"}
            onClick={() => dispatch(changeSidebarSortType("SUPPORT"))}
            icon={<FallOutlined className={styles.switchersBtn} />}
          />
        )}
      </div>
    </div>
  );
};
