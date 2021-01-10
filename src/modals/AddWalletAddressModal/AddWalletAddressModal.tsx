import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import obyte from "obyte";
import { IStore } from "store/reducers/index.interface";
import { IModals } from "store/reducers/modals.interface";
import { addWalletClose } from "../../store/actions/modals/addWallet";
import { addWalletAddress } from "../../store/actions/settings/addWalletAddress";

export interface IInitAddressState {
  value: undefined | string;
  valid: undefined | boolean;
}

export const AddWalletAddressModal: React.FC = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState<IInitAddressState>({
    value: undefined,
    valid: undefined,
  });
  const showDrawersAllStore: IModals = useSelector(
    (state: IStore) => state.modals.addWallet
  );
  const addressInput = useRef<any>(null);
  const visible = showDrawersAllStore.visible;
  const handleCancel = () => {
    dispatch(addWalletClose());
    setAddress({ value: undefined, valid: undefined });
  };

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    // @ts-ignore
    if (obyte.utils.isValidAddress(value)) {
      setAddress({ value: value, valid: true });
    } else {
      setAddress({ value: value, valid: false });
    }
  };
  let validateStatus: "" | "success" | "error" = "";

  if (address.valid === true) {
    validateStatus = "success";
  } else if (address.valid === false) {
    validateStatus = "error";
  } else {
    validateStatus = "";
  }
  const handleAdd = (address: string | undefined) => {
    if (address) {
      dispatch(addWalletAddress(address));
    }
    handleCancel();
  };

  useEffect(() => {
    addressInput?.current?.focus();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      title="Add wallet address"
      style={{ zIndex: -1 }}
      onCancel={handleCancel}
      footer={[
        <Button key="close" onClick={handleCancel}>
          Close
        </Button>,
        <Button
          key="add"
          type="primary"
          disabled={!address.valid}
          onClick={() => handleAdd(address.value)}
        >
          Add
        </Button>,
      ]}
    >
      <Form>
        <Form.Item hasFeedback={true} validateStatus={validateStatus}>
          <Input
            placeholder="Wallet address"
            value={address.value}
            onChange={handleChange}
            ref={addressInput}
            autoFocus={true}
            onKeyPress={(ev: React.KeyboardEvent) => {
              if (ev.key === "Enter") {
                handleAdd(address.value);
              }
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
