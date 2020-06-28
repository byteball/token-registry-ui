import React from "react";
import { List, Space } from "antd";
import { ButtonLink } from "components/ButtonLink/ButtonLink";
import { IDescriptionsByAsset } from "store/selectors/getDescriptionsByAsset";
import { generateLink } from "utils/generateLink";
import { editInfoOpen } from "store/actions/modals/editInfo";
import { useDispatch } from "react-redux";

export interface IChangeInfoList {
  data: IDescriptionsByAsset[];
  activeWallet?: string;
  isActive?: boolean;
}

export const ChangeInfoList: React.FC<IChangeInfoList> = ({
  data,
  activeWallet,
  isActive,
}) => {
  const dispatch = useDispatch();
  return (
    <List
      dataSource={data}
      pagination={{ pageSize: 5, hideOnSinglePage: true }}
      renderItem={(item: IDescriptionsByAsset) => (
        <div
          style={{
            padding: 10,
            border: "1px solid #ddd",
            marginBottom: 5,
            wordBreak: "break-all",
          }}
        >
          <div>
            Description: <b>{item.text}</b>
          </div>
          <div>
            Decimals: <b>{item.decimals}</b>
          </div>
          <div>
            <Space size="middle">
              <a
                type="link"
                // @ts-ignore
                disabled={!isActive}
                href={generateLink(
                  0.001 * 1e9,
                  {
                    description: item.text,
                    asset: item.asset,
                    decimals: item.decimals,
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
                  dispatch(
                    editInfoOpen(item.symbol, item.decimals, item.text, true)
                  )
                }
              >
                Edit
              </ButtonLink>
            </Space>
          </div>
        </div>
      )}
    />
  );
};
