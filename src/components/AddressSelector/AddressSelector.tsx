import React from "react";
import { Button, Divider, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import styles from "./AddressSelector.module.css";
import { addWalletOpen } from "store/actions/modals/addWallet";
import { IStore } from "store/reducers/index.interface";
import { changeActiveWalletAddress } from "store/actions/settings/changeActiveWalletAddress";

const { Option } = Select;

export interface IAddressSelector {}

export const AddressSelector: React.FC<IAddressSelector> = () => {
  const dispatch = useDispatch();

  const wallets = useSelector<IStore, string[]>(
    (state) => state.settings.wallets
  );

  const activeWallet = useSelector<IStore, string | undefined>(
    (state) => state.settings.activeWallet
  );

  return (
    <Select
      className={styles.select}
      placeholder="Select an address"
      bordered={false}
      value={activeWallet}
      dropdownClassName={styles.dropdown}
      dropdownMatchSelectWidth={false}
      onChange={(address) => {
        if (typeof address === "string") {
          dispatch(changeActiveWalletAddress(address));
        }
      }}
      dropdownRender={(menu) => (
        <div>
          {menu}
          <Divider
            style={{
              marginTop: 5,
              marginBottom: 5,
              borderColor: "#002549",
            }}
          />
          <div style={{ paddingLeft: 5 }}>
            <Button type="link" onClick={() => dispatch(addWalletOpen())}>
              Add address
            </Button>
          </div>
        </div>
      )}
    >
      {wallets &&
        wallets.map((address: string, i: number) => {
          return (
            <Option
              value={address}
              key={"wallet-" + i + address}
              className={styles.option}
            >
              {address}
            </Option>
          );
        })}
    </Select>
  );
};
