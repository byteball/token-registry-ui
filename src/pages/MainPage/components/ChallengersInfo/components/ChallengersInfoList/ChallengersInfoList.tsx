import React from "react";
import { List } from "antd";
import { ISupportLink } from "store/reducers/data.interface";
import { ButtonLink } from "components/ButtonLink/ButtonLink";
import { store } from "index";
import { addSupportOpen } from "store/actions/modals/addSupport";

export interface IChallengersInfoList {
  data: ISupportLink[];
}

export const ChallengersInfoList: React.FC<IChallengersInfoList> = ({
  data,
}) => {
  return (
    <List
      dataSource={data}
      pagination={{ pageSize: 5, hideOnSinglePage: true }}
      renderItem={(item: ISupportLink) => (
        <div
          style={{
            padding: 10,
            border: "1px solid #ddd",
            marginBottom: 5,
            wordBreak: "break-all",
          }}
        >
          <div>
            Symbol: <b>{item.symbol}</b>
          </div>
          <div>
            Asset: <b>{item.asset}</b>
          </div>
          <div>
            Support: <b>{Number(item.support) / 1e9}</b> GB
          </div>
          <div>
            Support in drawers:{" "}
            <b>
              {item.lockSupport ? Number(item.lockSupport) / 1e9 + " GB" : "-"}
            </b>
          </div>
          <div>
            {" "}
            <ButtonLink
              type="link"
              onClick={() => {
                if (item.symbol !== undefined && item.asset !== undefined) {
                  store.dispatch(addSupportOpen(item.symbol, item.asset));
                }
              }}
            >
              Add support
            </ButtonLink>
          </div>
        </div>
      )}
    />
  );
};
