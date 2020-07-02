import { Button, Space, Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { IStore } from "store/reducers/index.interface";
import {
  getDescriptionsByAsset,
  IDescriptionsByAsset,
} from "store/selectors/getDescriptionsByAsset";
import { ButtonLink } from "components/ButtonLink/ButtonLink";
import { store } from "index";
import { editInfoOpen } from "store/actions/modals/editInfo";
import { generateLink } from "utils/generateLink";
import { ChangeInfoList } from "./components/ChangeInfoList";

export interface IChangeInfo {
  readonly currentAsset: string;
  readonly currentSymbol: string;
  readonly decimals?: number;
  readonly description?: string;
  readonly isActive?: boolean;
  readonly activeWallet?: string;
  readonly widthWindow: number;
}

export const ChangeInfo: React.FC<IChangeInfo> = ({
  currentAsset,
  currentSymbol,
  isActive,
  activeWallet,
  widthWindow,
}) => {
  const columns = [
    {
      title: "Description",
      dataIndex: "text",
      key: "description",
    },
    {
      title: "Decimals",
      dataIndex: "decimals",
      key: "decimals",
      width: 100,
    },
    {
      title: "Сurrent support",
      dataIndex: "support",
      key: "cursupp",
      width: 150,
      sorter: (a: any, b: any) => a.support - b.support,
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
      render: (support: number) => {
        return support / 1e9 + " GB";
      },
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (text: string, record: IDescriptionsByAsset) => {
        return (
          <Space>
            <a
              type="link"
              // @ts-ignore
              disabled={!isActive}
              href={generateLink(
                0.001 * 1e9,
                {
                  description: record.text,
                  asset: record.asset,
                  decimals: record.decimals,
                },
                activeWallet
              )}
            >
              Vote
            </a>
            <ButtonLink
              type="link"
              disabled={!isActive}
              onClick={() =>
                store.dispatch(
                  editInfoOpen(
                    record.symbol,
                    record.decimals,
                    record.text,
                    true
                  )
                )
              }
            >
              Edit
            </ButtonLink>
          </Space>
        );
      },
    },
  ];

  const descriptions = useSelector<IStore, IDescriptionsByAsset[]>(
    (state: IStore) =>
      getDescriptionsByAsset(state, currentAsset, currentSymbol)
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: 48,
          marginBottom: 24,
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 26 }}>
          Voting for the description and decimals
        </div>
        <div>
          <Button
            type="link"
            size="large"
            disabled={!isActive}
            onClick={() => {
              store.dispatch(editInfoOpen(currentSymbol));
            }}
          >
            Edit information
          </Button>
        </div>
      </div>
      <p>Voting/editing is available only to those who support the current symbol-asset connection.</p>
      <div>
        {widthWindow && widthWindow > 800 ? (
          <Table
            dataSource={descriptions}
            // @ts-ignore
            columns={columns}
            size="small"
            pagination={{ pageSize: 5, hideOnSinglePage: true }}
            expandable={{ defaultExpandAllRows: true }}
            rowKey={(record: IDescriptionsByAsset) =>
              "discr-" + record.text! + record.decimals + record.support
            }
          />
        ) : (
          <ChangeInfoList
            data={descriptions}
            isActive={isActive}
            activeWallet={activeWallet}
          />
        )}
      </div>
    </>
  );
};
