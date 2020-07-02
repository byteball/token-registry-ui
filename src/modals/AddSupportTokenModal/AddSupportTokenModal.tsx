import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Input, Modal, Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addSupportClose } from "store/actions/modals/addSupport";
import { IStore } from "store/reducers/index.interface";
import { IModalAddSupport } from "store/reducers/modals.interface";
import { IAddSupportData } from "./AddSupportTokenModal.interface";
import { generateLink } from "../../utils/generateLink";
import { typeFields } from "../../global.interface";
import { validator } from "../../utils/validators";
import { Rule } from "antd/lib/form";
import { redirect } from "../../utils/redirect";

const { Option } = Select;
const { useForm } = Form;

export interface IAddSupportTokenModal {
  activeWallet?: string;
}
export const AddSupportTokenModal: React.FC<IAddSupportTokenModal> = ({
  activeWallet,
}) => {
  const dispatch = useDispatch();
  const [form] = useForm();

  const [formValid, setFormValid] = useState({
    asset: true,
    symbol: true,
    support: false,
    drawer: false,
  });

  const { asset, symbol, support, drawer } = form.getFieldsValue();

  const addSupportStore: IModalAddSupport = useSelector(
    (state: IStore) => state.modals.addSupport
  );

  const visible = addSupportStore.visible;

  const { resetFields, setFieldsValue } = form;

  const clearValid = () => {
    setFormValid((f) => ({ ...f, support: false, drawer: false }));
  };

  useEffect(() => {
    setFieldsValue({
      symbol: addSupportStore.symbol,
      asset: addSupportStore.asset,
    });
  }, [addSupportStore, setFieldsValue]);

  const handleCancel = () => {
    dispatch(addSupportClose());
    resetFields();
    clearValid();
  };

  const data: IAddSupportData = { symbol, asset, drawer: 0 };

  if (drawer) {
    data.drawer = drawer;
  }

  const urlWithData = useMemo(
    () => generateLink(support * 1e9, data, activeWallet),
    [data, support, activeWallet]
  );

  const handleSend = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    redirect(urlWithData);
    handleCancel();
  };

  const validateValue = (value: string, type: typeFields) =>
    validator(
      value,
      type,
      () => {
        setFormValid((f) => ({ ...f, [type]: true }));
      },
      () => {
        setFormValid((f) => ({ ...f, [type]: false }));
      }
    );

  const isValidData = formValid.support && formValid.drawer;

  return (
    <Modal
      visible={visible}
      title="Add support"
      style={{ zIndex: -1 }}
      onCancel={handleCancel}
      footer={
        <Space>
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>
          <a
            className="ant-btn ant-btn-primary"
            key="addSupport"
            onClick={handleSend}
            // @ts-ignore
            disabled={!isValidData}
            href={urlWithData}
          >
            Add support
          </a>
        </Space>
      }
    >
      <Form
        size="large"
        form={form}
        // initialValues={{
        //   symbol: initialSymbol,
        //   asset: initialAsset,
        // }}
      >
        <Form.Item
          hasFeedback
          name="symbol"
          validateFirst={true}
          rules={[
            {
              validator: (rule: Rule, value: string) =>
                validateValue(value, "symbol"),
            },
          ]}
        >
          <Input placeholder="Symbol" disabled={true} autoComplete="off" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="asset"
          validateFirst={true}
          rules={[
            {
              validator: (rule: Rule, value: string) =>
                validateValue(value, "asset"),
            },
          ]}
        >
          <Input placeholder="Asset" disabled={true} autoComplete="off" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="support"
          rules={[
            {
              validator: (rule: Rule, value: string) =>
                validateValue(value, "support"),
            },
          ]}
        >
          <Input
            placeholder="Your deposit in support of this symbol (in GBYTEs)"
            suffix="GB"
            autoFocus={true}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="drawer"
          rules={[
            {
              validator: (rule: Rule, value: string) =>
                validateValue(value, "drawer"),
            },
          ]}
        >
          <Select placeholder="Select drawer">
            <Option key="drawer-" value={0}>
              0 days
            </Option>
            <Option key="drawer-1" value={1}>
              1 days
            </Option>
            <Option key="drawer-7" value={7}>
              7 days
            </Option>
            <Option key="drawer-30" value={30}>
              30 days
            </Option>
            <Option key="drawer-90" value={90}>
              90 days
            </Option>
            <Option key="drawer-180" value={180}>
              180 days
            </Option>
            <Option key="drawer-360" value={360}>
              360 days
            </Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
