import React, { useState, useEffect, useMemo } from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "store/reducers/index.interface";
import { IModalEditInfo } from "store/reducers/modals.interface";
import { generateLink } from "../../utils/generateLink";
import { typeFields } from "../../global.interface";
import { validator } from "../../utils/validators";
import { Rule } from "antd/lib/form";
import { redirect } from "utils/redirect";
import { editInfoClose } from "store/actions/modals/editInfo";

const { TextArea } = Input;

interface FieldData {
  name: string[];
  value: any;
  touched: boolean;
  validating: boolean;
  errors: string[];
}
const initalFieldsProp = { touched: false, validating: false, errors: [] };
export const EditInfo: React.FC = () => {
  const dispatch = useDispatch();

  const editInfoStore: IModalEditInfo = useSelector(
    (state: IStore) => state.modals.editInfo
  );
  const [fields, setFields] = useState<FieldData[]>([]);

  const visible = editInfoStore.visible;
  const symbol = fields.find((f) => f.name[0] === "symbol")?.value;
  const description = fields.find((f) => f.name[0] === "description")?.value;
  const decimals = fields.find((f) => f.name[0] === "decimals")?.value;

  const [formValid, setFormValid] = useState({
    symbol: true,
    support: true,
    description: false,
    decimals: false,
  });

  const handleCancel = () => {
    dispatch(editInfoClose());
  };

  const urlWithData = useMemo(
    () =>
      generateLink(1e4, {
        symbol,
        description,
        decimals,
      }),
    [decimals, description, symbol]
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

  useEffect(() => {
    setFields(() => [
      {
        name: ["symbol"],
        value: editInfoStore.symbol,
        ...initalFieldsProp,
      },
      {
        name: ["decimals"],
        value: editInfoStore.decimals,
        ...initalFieldsProp,
      },
      {
        name: ["description"],
        value: editInfoStore.description,
        ...initalFieldsProp,
      },
      {
        name: ["support"],
        value: "0.001",
        ...initalFieldsProp,
      },
    ]);
    setFormValid({
      symbol: true,
      support: true,
      description: editInfoStore.isEdit || false,
      decimals: editInfoStore.isEdit || false,
    });
  }, [editInfoStore, visible, setFormValid]);

  const isValidData =
    decimals !== "" && formValid.decimals && formValid.description;

  return (
    <Modal
      visible={visible}
      title="Edit token info"
      style={{ zIndex: -1 }}
      onCancel={handleCancel}
      footer={
        <Space>
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>
          <Button
            type="primary"
            key="addSupport"
            onClick={handleSend}
            // @ts-ignore
            disabled={!isValidData}
            href={urlWithData}
          >
            Add info
          </Button>
        </Space>
      }
    >
      <Form
        size="large"
        fields={fields}
        onFieldsChange={(changedFields, allFields) => {
          setFields(allFields as FieldData[]);
        }}
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
        <Form.Item hasFeedback name="support">
          <Input
            placeholder="Your deposit in support of this symbol (in GBYTEs)"
            suffix="GB"
            disabled={true}
            autoFocus={true}
            autoComplete="off"
          />
        </Form.Item>
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
              pattern: new RegExp("/(\\w+)\\s(\\w+)/"),
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
      </Form>
    </Modal>
  );
};
