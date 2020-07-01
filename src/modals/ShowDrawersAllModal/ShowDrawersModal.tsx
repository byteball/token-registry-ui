import React from "react";
import { Button, List, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { IStore } from "store/reducers/index.interface";
import { IModalShowDrawers } from "store/reducers/modals.interface";
import { IDrawersAddress } from "../../store/reducers/data.interface";
import { showAllDrawersClose } from "../../store/actions/modals/showDrawers";

export interface IShowDrawersAllModal {
  drawers?: IDrawersAddress;
}

export const ShowDrawersModal: React.FC<IShowDrawersAllModal> = ({
  drawers,
}) => {
  const dispatch = useDispatch();

  const showDrawersAllStore: IModalShowDrawers = useSelector(
    (state: IStore) => state.modals.showDrawers
  );

  const visible = showDrawersAllStore.visible;
  const type = showDrawersAllStore.type;
  const handleCancel = () => {
    dispatch(showAllDrawersClose());
  };
  const dataList = [];

  for (let addressAndDrawer in drawers) {
    const support = drawers[addressAndDrawer].support;
    const drawer = drawers[addressAndDrawer].drawer;
    const [address] = addressAndDrawer?.split("_");

    if (type === "all" || Number(drawer) !== 0) {
      const findIndex = dataList.findIndex((d) => d.address === address);
      if (type === "all" && findIndex !== -1 && support) {
        dataList[findIndex].support = dataList[findIndex].support! + support;
      } else {
        dataList.push({
          address,
          drawer,
          support,
        });
      }
    }
  }

  return (
    <Modal
      visible={visible}
      title={type === "all" ? "Supporters" : "Support in drawers"}
      style={{ zIndex: -1 }}
      onCancel={handleCancel}
      footer={[
        <Button key="close" onClick={handleCancel}>
          Close
        </Button>,
      ]}
    >
      {type && (
        <List
          dataSource={dataList}
          itemLayout="horizontal"
          pagination={{ pageSize: 5, hideOnSinglePage: true }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<b>{item.address}</b>}
                description={
                  type === "all" ? (
                    <span>{Number(item.support) / 1e9} GB</span>
                  ) : (
                    <>
                      <span>{Number(item.support) / 1e9} GB</span>
                      <span style={{ color: "red" }}>
                        {" "}
                        ({item.drawer} days)
                      </span>
                    </>
                  )
                }
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
};
