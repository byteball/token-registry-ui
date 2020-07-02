import { Button, Table, Tabs, Tooltip } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTokenOpen } from "store/actions/modals/createToken";
import { IStore } from "store/reducers/index.interface";
import { getChallengers, IChallengers } from "store/selectors/getChallengers";
import { ISupportLink } from "store/reducers/data.interface";
import { store } from "index";
import { addSupportOpen } from "store/actions/modals/addSupport";
import { ButtonLink } from "components/ButtonLink/ButtonLink";
import { ChallengersInfoList } from "./components/ChallengersInfoList/ChallengersInfoList";
const { TabPane } = Tabs;

const columnsBySymbol = [
  {
    title: (
      <Tooltip title="Other symbols suggested for this asset">
        <span style={{ borderBottom: "1px dotted #1890ff", cursor: "default" }}>
          Symbol
        </span>
      </Tooltip>
    ),
    dataIndex: "symbol",
    key: "symbol",
  },
  {
    title: "Current support",
    dataIndex: "support",
    key: "support",
    sorter: (a: any, b: any) => a.support - b.support,
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend",
    render: (support: number) => {
      return support / 1e9 + " GB";
    },
  },
  {
    title: (
      <Tooltip title="Support that is locked in drawers and cannot be quickly withdrawn">
        <span style={{ borderBottom: "1px dotted #1890ff", cursor: "default" }}>Support in drawers</span>
      </Tooltip>
    ),
    dataIndex: "lockSupport",
    key: "lockSupport",
    render: (support: number) => {
      if (support) {
        return support / 1e9 + " GB";
      } else {
        return "-";
      }
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_t: any, record: ISupportLink) => {
      return (
        <ButtonLink
          type="link"
          onClick={() => {
            if (record.symbol !== undefined && record.asset !== undefined) {
              store.dispatch(addSupportOpen(record.symbol, record.asset));
            }
          }}
        >
          Add support
        </ButtonLink>
      );
    },
  },
];
const columnsByAsset = [
  {
    title: (
      <Tooltip title="Other assets suggested for this symbol">
        <span style={{ borderBottom: "1px dotted #1890ff", cursor: "default" }}>
          Asset
        </span>
      </Tooltip>
    ),
    dataIndex: "asset",
    key: "asset",
  },
  {
    title: "Сurrent support",
    dataIndex: "support",
    filterMultiple: false,
    key: "support",
    sorter: (a: any, b: any) => a.support - b.support,
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend",
    render: (support: number) => {
      return support / 1e9 + " GB";
    },
  },
  {
    title: (
      <Tooltip title="Support that is locked in drawers and cannot be quickly withdrawn">
        <span style={{ borderBottom: "1px dotted #1890ff", cursor: "default" }}>Support in drawers</span>
      </Tooltip>
    ),
    dataIndex: "lockSupport",
    key: "lockSupport",
    render: (support: number) => {
      if (support) {
        return support / 1e9 + " GB";
      } else {
        return "-";
      }
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_t: any, record: ISupportLink) => {
      return (
        <ButtonLink
          type="link"
          onClick={() => {
            if (record.symbol !== undefined && record.asset !== undefined) {
              store.dispatch(addSupportOpen(record.symbol, record.asset));
            }
          }}
        >
          Add support
        </ButtonLink>
      );
    },
  },
];

export interface IChallengersInfo {
  readonly currentSymbol: string;
  readonly currentAsset: string;
  readonly widthWindow: number;
}

export const ChallengersInfo: React.FC<IChallengersInfo> = ({
  currentSymbol,
  currentAsset,
  widthWindow,
}) => {
  const dispatch = useDispatch();
  const challengers: IChallengers = useSelector((state: IStore) =>
    getChallengers(state, currentSymbol, currentAsset)
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: 48,
          marginBottom: 24,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 26 }}>All symbol-asset connections</div>
        {widthWindow && widthWindow < 800 && (
          <div>
            <Button
              type="link"
              size="large"
              onClick={() => dispatch(createTokenOpen())}
            >
              Add new link
            </Button>
          </div>
        )}
      </div>

      <div>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane tab="COMPETING ASSETS" key="tab-1">
            {widthWindow && widthWindow > 800 ? (
              <Table
                footer={() => (
                  <ButtonLink
                    onClick={() =>
                      dispatch(createTokenOpen({ symbol: currentSymbol }))
                    }
                  >
                    Add new
                  </ButtonLink>
                )}
                dataSource={challengers.bySymbol}
                // @ts-ignore
                columns={columnsByAsset}
                sortDirections={["ascend", "descend"]}
                rowKey={(record: ISupportLink) =>
                  "dis-asset-" + record.asset! + record.symbol + record.support
                }
                size="small"
                pagination={{ pageSize: 5, hideOnSinglePage: true}}
              />
            ) : (
              <ChallengersInfoList data={challengers.bySymbol} />
            )}
          </TabPane>
          <TabPane tab="COMPETING SYMBOLS" key="tab-2">
            {widthWindow && widthWindow > 800 ? (
              <Table
                footer={() => (
                  <ButtonLink
                    onClick={() =>
                      dispatch(createTokenOpen({ asset: currentAsset }))
                    }
                  >
                    Add new
                  </ButtonLink>
                )}
                dataSource={challengers.byAsset}
                // @ts-ignore
                columns={columnsBySymbol}
                rowKey={(record: ISupportLink) =>
                  "dis-symbol-" + record.asset! + record.symbol + record.support
                }
                size="small"
                pagination={{ pageSize: 5, hideOnSinglePage: true }}
              />
            ) : (
              <ChallengersInfoList data={challengers.byAsset} />
            )}
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};
