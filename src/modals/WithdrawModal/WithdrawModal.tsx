import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button, Space, Input, Form, Tabs } from "antd";
import { isEqual } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Rule } from "antd/lib/form";
import { validator } from "utils/validators";

import {
  getDrawersByAddress,
  INewData,
} from "store/selectors/getDrawersByAddress";

import { IStore } from "store/reducers/index.interface";
import { IDrawer } from "store/reducers/data.interface";
import { generateLink } from "utils/generateLink";
import { withdrawClose } from "store/actions/modals/withdraw";
import { IModals } from "store/reducers/modals.interface";
import { DrawerList } from "./components/DrawerList/DrawerList";
import {
  IDataDrawer,
  IWithdrawModal,
  IDataWithdraw,
} from "./withdraw.interface";
import { getDrawerStatus, TStatusDrawer } from "./utils/getDrawerStatus";

const { TabPane } = Tabs;

export const WithdrawModal: React.FC<IWithdrawModal> = ({
  currentAsset,
  currentAddress,
  currentSymbol,
}) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const [isActiveWithdraw, setActiveWithdraw] = useState(false);
  const drawersByAddress: INewData | undefined = useSelector((state: IStore) =>
    getDrawersByAddress(state, currentAddress, currentAsset, currentSymbol)
  );
  const withdrawStore: IModals = useSelector(
    (state: IStore) => state.modals.withdraw
  );
  const [formInstance] = Form.useForm();

  const { resetFields } = formInstance;

  const [active, setActive] = useState<IDrawer | {}>({});
  const { visible } = withdrawStore;

  useEffect(() => {
    resetFields();
  }, [isActiveWithdraw, resetFields]);

  useEffect(() => {
    setActive({});
    setAmount(0);
  }, [visible]);

  const handleChangeActive = (item: IDataDrawer) => {
    if (!isEqual(item, active)) {
      setActive(item);
    }
  };

  let currentStatus: TStatusDrawer = useMemo(() => getDrawerStatus(active), [
    active,
  ]);

  let data: IDataWithdraw = {};
  if (active) {
    if ("asset" in active) {
      data.asset = active.asset;
    }
    if ("symbol" in active) {
      data.symbol = active.symbol;
    }
    if ("drawer" in active && (currentStatus === "lock" || (currentStatus === "expiry"))) {
      data.drawer = active.drawer;
    }
    if (
      (currentStatus === "free" || currentStatus === "lock") &&
      "support" in active &&
      active.support
    ) {
      data = { ...data, withdraw: 1, amount: active.support };
      if (currentStatus === "free") {
        data = { ...data, amount };
      }
    } else if (currentStatus === "expiry") {
      data = { ...data, move: 1, address: currentAddress };
    }
  }

  const urlWithData = useMemo(() => generateLink( 1e4, data, currentAddress), [
    data,
    currentAddress,
  ]);

  return (
    <Modal
      title="Withdraw support"
      visible={visible}
      destroyOnClose={true}
      forceRender={true}
      onCancel={() => dispatch(withdrawClose())}
      footer={
        <Space>
          <Button onClick={() => dispatch(withdrawClose())}>Close</Button>
          {currentStatus === "free" && (
            <Button type="primary" onClick={() => setActiveWithdraw(true)}>
              Withdraw...
            </Button>
          )}
          {currentStatus === "expiry" && (
            <a
              className="ant-btn ant-btn-primary"
              key="move"
              href={urlWithData}
            >
              Move support
            </a>
          )}
          {currentStatus === "lock" && (
            <a
              className="ant-btn ant-btn-primary"
              key="move"
              href={urlWithData}
            >
              Unlock drawer
            </a>
          )}
        </Space>
      }
    >
      <Tabs animated={false} onChange={() => setActive({})}>
        <TabPane tab="By symbol" key="1">
          {drawersByAddress && currentSymbol && (
            <DrawerList
              data={drawersByAddress.bySymbol}
              currentSymbol={currentSymbol}
              active={active}
              handleChangeActive={handleChangeActive}
            />
          )}
        </TabPane>
        <TabPane tab="By asset" key="2">
          {drawersByAddress && currentSymbol && (
            <DrawerList
              data={drawersByAddress.byAsset}
              currentSymbol={currentSymbol}
              active={active}
              handleChangeActive={handleChangeActive}
            />
          )}
        </TabPane>
      </Tabs>
      <Modal
        title="Withdraw"
        visible={isActiveWithdraw}
        onCancel={() => setActiveWithdraw(false)}
        footer={
          <Space>
            <Button onClick={() => setActiveWithdraw(false)}>Close</Button>
            <a
              className="ant-btn ant-btn-primary"
              key="move"
              // @ts-ignore
              disabled={amount === 0}
              href={urlWithData}
              onClick={() => setActiveWithdraw(false)}
            >
              Withdraw
            </a>
          </Space>
        }
      >
        <Form form={formInstance}>
          <Form.Item
            hasFeedback
            name="amount"
            rules={[
              {
                validator: (rule: Rule, value: string) =>
                  validator(
                    value,
                    "support",
                    () => setAmount(Number(value) * 1e9),
                    () => setAmount(0),
                    active &&
                      "support" in active &&
                      active.support !== undefined
                      ? active.support / 1e9
                      : undefined,
                    0
                  ),
              },
            ]}
          >
            <Input
              placeholder={`Amount  ${
                active && "support" in active && active.support !== undefined
                  ? "(Max: " + active.support / 1e9 + " GB)"
                  : ""
              }`}
              suffix="GB"
              autoFocus={true}
              autoComplete="off"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Modal>
  );
};
