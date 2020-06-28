import React, { useState } from "react";
import { Button, List } from "antd";
import { IDrawer } from "store/reducers/data.interface";
import { WithdrawItem } from "../WithdrawItem/WithdrawItem";
import { isEqual } from "lodash";

export interface IDrawerList {
  data: any;
  currentSymbol: string;
  active: IDrawer | {};
  handleChangeActive: (item: IDrawer) => void;
}
export const DrawerList: React.FC<IDrawerList> = ({
  data,
  currentSymbol,
  active,
  handleChangeActive,
}) => {
  const [itemCount, setItemCount] = useState(4);

  return (
    <List
      dataSource={data}
      locale={{ emptyText: "No drawers" }}
      loadMore={
        itemCount < data?.length && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => setItemCount((c) => c + 4)}>
              Load more
            </Button>
          </div>
        )
      }
      pagination={{ pageSize: itemCount, hideOnSinglePage: true }}
      renderItem={(item: IDrawer) => (
        <WithdrawItem
          onChangeActive={() => handleChangeActive(item)}
          active={isEqual(active, item)}
          symbol={item.symbol || "-"}
          asset={item.asset || "-"}
          support={item.support || 0}
          drawer={item.drawer || 0}
          expiry_ts={item.expiry_ts}
          currentSymbol={currentSymbol}
        />
      )}
    />
  );
};
