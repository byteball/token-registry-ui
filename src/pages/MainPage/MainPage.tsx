import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { MainLayout } from "components/MainLayout/MainLayout";
import { HeadInfo } from "./components/HeadInfo/HeadInfo";
import { CurrentInfo } from "./components/CurrentInfo/CurrentInfo";
import { ChallengersInfo } from "./components/ChallengersInfo/ChallengersInfo";
import { ChangeInfo } from "./components/ChangeInfo/ChangeInfo";
import { CreateTokenModal } from "modals/CreateTokenModal/CreateTokenModal";
import { AddSupportTokenModal } from "modals/AddSupportTokenModal/AddSupportTokenModal";
import { ShowDrawersModal } from "modals/ShowDrawersAllModal/ShowDrawersModal";
import { getTokenInfoBySymbol } from "store/selectors/getTokenInfoBySymbol";
import { Loader } from "components/Loader/Loader";
import { useWindowSize } from "hooks/useWindowSize";

import { IStore } from "store/reducers/index.interface";

import styles from "./MainPage.module.css";
import { EditInfo } from "../../modals/EditInfoModal/EditInfoModal";
import { changeActiveSymbol } from "../../store/actions/active/changeActiveSymbol";
import historyInstance from "../../historyInstance";
import { AddWalletAddressModal } from "../../modals/AddWalletAddressModal/AddWalletAddressModal";
import { WithdrawModal } from "../../modals/WithdrawModal/WithdrawModal";
import { Alert } from "antd";
import { addWalletOpen } from "../../store/actions/modals/addWallet";
export interface IMainParams {
  symbol: string;
}
export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const loaded = useSelector((state: IStore) => state.data.loaded);
  const assets = useSelector((state: IStore) => state.data.assets);
  const active = useSelector((state: IStore) => state.active);
  const activeWallet = useSelector(
    (state: IStore) => state.settings.activeWallet
  );
  const params = useParams<IMainParams>();
  const [width] = useWindowSize();

  const tokenInfo = useSelector((state: IStore) =>
    getTokenInfoBySymbol(state, active)
  );

  useEffect(() => {
    if (params.symbol === undefined && active !== null) {
      historyInstance.replace(`/${active}`);
    } else if (params.symbol !== undefined && active !== params.symbol) {
      dispatch(changeActiveSymbol(params.symbol));
    }
  }, [active, dispatch, params.symbol]);

  if (!loaded) {
    return <Loader />;
  }

  return (
    <MainLayout>
      {!activeWallet && (
        <Alert
          message="To have more features in the app add your wallet address"
          type="warning"
          showIcon
          banner={true}
          onClick={() => dispatch(addWalletOpen())}
          style={{ cursor: "pointer" }}
        />
      )}
      {active && tokenInfo ? (
        <>
          <HeadInfo
            symbol={tokenInfo.symbol}
            asset={tokenInfo.currentAsset}
            status={tokenInfo.status}
            endDispute={tokenInfo.endDispute}
            width={width}
          />
          <CurrentInfo
            currentSupport={tokenInfo.currentSupport}
            drawerSupport={tokenInfo.drawerSupport}
            description={tokenInfo.currentDescription}
            decimals={tokenInfo.currentDecimals}
            asset={tokenInfo.currentAsset}
            status={tokenInfo.status}
            symbol={tokenInfo.symbol}
            drawers={tokenInfo.currentDrawers}
            activeWallet={activeWallet}
            isActive={Boolean(
              activeWallet &&
                tokenInfo.currentAsset &&
                assets &&
                "balances" in assets[tokenInfo.currentAsset] &&
                activeWallet in assets[tokenInfo.currentAsset].balances!
            )}
          />
          {tokenInfo.symbol && tokenInfo.currentAsset && (
            <>
              <ChallengersInfo
                currentSymbol={tokenInfo.symbol}
                currentAsset={tokenInfo.currentAsset}
                widthWindow={width}
              />
              {(!!tokenInfo.currentDescription ||
                !!tokenInfo.currentDecimals) && (
                <ChangeInfo
                  currentAsset={tokenInfo.currentAsset}
                  currentSymbol={tokenInfo.symbol}
                  description={tokenInfo.currentDescription}
                  decimals={tokenInfo.currentDecimals}
                  activeWallet={activeWallet}
                  widthWindow={width}
                  isActive={Boolean(
                    activeWallet &&
                      assets &&
                      "balances" in assets[tokenInfo.currentAsset] &&
                      activeWallet in assets[tokenInfo.currentAsset].balances!
                  )}
                />
              )}
            </>
          )}
        </>
      ) : (
        <div className={styles.placeholder}>Please select a token</div>
      )}

      {/*Modals*/}
      <CreateTokenModal activeWallet={activeWallet} />
      <AddWalletAddressModal />

      {tokenInfo && "currentAsset" in tokenInfo && "symbol" in tokenInfo && (
        <>
          <AddSupportTokenModal activeWallet={activeWallet} />
          <EditInfo />
          <ShowDrawersModal drawers={tokenInfo?.currentDrawers} />
          <WithdrawModal
            currentAddress={activeWallet}
            currentAsset={tokenInfo.currentAsset}
            currentSymbol={tokenInfo.symbol}
          />
        </>
      )}
    </MainLayout>
  );
};
