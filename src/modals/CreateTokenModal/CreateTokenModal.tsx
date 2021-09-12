import React, { useEffect, useState, useMemo } from "react";
import { Button, Form, Input, Modal, Select, Alert, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Rule } from "antd/lib/form";
import { FieldData, Callbacks } from "rc-field-form/lib/interface";

import {
  createTokenCheck,
  createTokenClear,
  createTokenClose,
} from "store/actions/modals/createToken";
import { generateLink } from "utils/generateLink";

import { IModalsCreateToken } from "store/reducers/modals.interface";
import { IStore } from "store/reducers/index.interface";
import {
  ICreateTokenData,
  ICreateTokenModal,
} from "./CreateTokenModal.interface";

import { alertWarnings } from "./createTokenWarnings";
import { validator } from "utils/validators";
import { typeFields } from "../../global.interface";

const { TextArea } = Input;
const { useForm } = Form;

const initState = {
  asset: false,
  symbol: false,
  decimals: false,
  support: false,
  description: false,
  drawer: false,
};

export const CreateTokenModal: React.FC<ICreateTokenModal> = ({
  activeWallet,
}) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState<FieldData[]>([]);
  const [form] = useForm();
  const [formValid, setFormValid] = useState({
    asset: false,
    symbol: false,
    decimals: false,
    support: false,
    description: false,
    drawer: false,
  });

  const createTokenStore: IModalsCreateToken = useSelector(
    (state: IStore) => state.modals.createToken
  );

  const clearValid = () => {
    setFormValid(() => initState);
  };

  const { visible, loading, check, minSupport } = createTokenStore;
  const initSymbol = createTokenStore.symbol;
  const initAsset = createTokenStore.asset;
  const { setFieldsValue, resetFields } = form;

  const handleCancel = () => {
    dispatch(createTokenClose());
    dispatch(createTokenClear());
    resetFields();
    clearValid();
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

  const onChangeForm: Callbacks["onFieldsChange"] = (
    changedFields,
    allFields
  ) => {
    setFields(allFields);
  };

  const {
    asset,
    symbol,
    decimals,
    description,
    support,
    drawer,
  } = form.getFieldsValue();

  const handleCheck = () => {
    dispatch(createTokenCheck(symbol, asset));
  };

  useEffect(() => {
    if (check !== null && check !== "link") {
      if (minSupport) {
        setFieldsValue({ support: String(Number(minSupport) / 1e9) });
        setFormValid((v) => ({ ...v, support: true }));
      }
    }
  }, [check, visible, minSupport, setFieldsValue]);

  let data: ICreateTokenData = { symbol, asset, drawer: 0 };

  if (drawer) {
    data.drawer = drawer;
  }

  useEffect(() => {
    setFieldsValue({ asset: initAsset, symbol: initSymbol });
    setFormValid((v) => ({ ...v, asset: !!initAsset, symbol: !!initSymbol }));
  }, [initAsset, initSymbol, setFieldsValue, visible]);

  if (check === "free" && decimals !== "" && formValid.decimals) {
    data = { ...data, decimals };
  }

  if (check === "free" && description !== "" && formValid.description) {
    data = { ...data, description };
  }

  const isValidData =
    formValid.support &&
    formValid.drawer &&
    ((formValid.decimals &&
      formValid.description) || !(check === "free"));

  const urlWithData = useMemo(
    () => generateLink(support * 1e9, data, activeWallet),
    [activeWallet, data, support]
  );

  const handleSend = () => {
    handleCancel();
  };

  return (
    <Modal
      visible={visible}
      title="Create token symbol"
      onOk={createTokenCheck}
      style={{ zIndex: -1 }}
      onCancel={handleCancel}
      getContainer={false}
      footer={
        <>
          <Space>
            <Button key="close" onClick={handleCancel}>
              Close
            </Button>
            <Button
              key="reset"
              onClick={() => {
                dispatch(createTokenClear());
                resetFields();
                clearValid();
              }}
            >
              Reset
            </Button>
            {check === null ? (
              <Button
                key="support"
                type="primary"
                loading={loading}
                disabled={!formValid.symbol || !formValid.asset}
                onClick={handleCheck}
              >
                Check
              </Button>
            ) : (
              <a
                className="ant-btn ant-btn-primary"
                key="create"
                onClick={handleSend}
                // @ts-ignore
                disabled={!isValidData}
                href={urlWithData}
              >
                {check === "link" ? "Add support" : "Create"}
              </a>
            )}
          </Space>
        </>
      }
    >
      <Form
        size="large"
        form={form}
        layout="vertical"
        fields={fields}
        // initialValues={{ symbol: initSymbol, asset: initAsset }}
        onFieldsChange={onChangeForm}
      >
        {check !== null && (
          <Form.Item>
            <Alert
              message={alertWarnings[check].text}
              type={alertWarnings[check].type}
            />
          </Form.Item>
        )}

        <Form.Item
          required
          hasFeedback
          name="symbol"
          validateTrigger="onChange"
          validateFirst={true}
          rules={[
            {
              validator: (rule: Rule, value: string) =>
                validateValue(value, "symbol"),
            },
          ]}
        >
          <Input
            placeholder="Symbol (Up to 40 characters)"
            disabled={check !== null}
            autoComplete="off"
            autoFocus={true}
          />
        </Form.Item>
        <Form.Item
          name="asset"
          hasFeedback
          validateFirst={true}
          rules={[
            {
              validator: (rule: Rule, value: string) =>
                validateValue(value, "asset"),
            },
          ]}
        >
          <Input
            placeholder="Asset ID (44 characters)"
            disabled={check !== null}
            autoComplete="off"
          />
        </Form.Item>
        {check !== null && (
          <>
            <Form.Item
              name="support"
              hasFeedback
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
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="drawer"
              hasFeedback
              rules={[
                {
                  validator: (rule: Rule, value: string) =>
                    validateValue(value, "drawer"),
                },
              ]}
            >
              <Select placeholder="Drawer">
                <Select.Option value={0}>0 days</Select.Option>
                <Select.Option value={7}>7 days</Select.Option>
                <Select.Option value={30}>30 days</Select.Option>
                <Select.Option value={90}>90 days</Select.Option>
                <Select.Option value={180}>180 days</Select.Option>
                <Select.Option value={360}>360 days</Select.Option>
              </Select>
            </Form.Item>
          </>
        )}
        {check === "free" && (
          <>
            <Form.Item
              hasFeedback
              name="decimals"
              rules={[
                {
                  type: "number",
                  validator: (rule: Rule, value: string) =>
                    validateValue(value, "decimals"),
                },
              ]}
            >
              <Input placeholder="Decimals" autoComplete="off" />
            </Form.Item>
            <Form.Item
              name="description"
              hasFeedback
              rules={[
                {
                  validator: (rule: Rule, value: string) =>
                    validateValue(value, "description"),
                },
              ]}
            >
              <TextArea
                rows={5}
                style={{ fontSize: 16 }}
                placeholder="Description"
                autoComplete="off"
              />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};
