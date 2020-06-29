import { IDrawer } from "store/reducers/data.interface";
import { isEqual } from "lodash";
import moment from "moment";

export type TStatusDrawer =
  | "free"
  | "no_expiry"
  | "expiry"
  | "lock"
  | undefined;

export const getDrawerStatus = (drawer: IDrawer | {}): TStatusDrawer => {
  const now = moment().unix();
  let currentStatus: TStatusDrawer = undefined;

  if (!isEqual(drawer, {})) {
    if (drawer && "expiry_ts" in drawer && drawer.expiry_ts) {
      if (now > drawer.expiry_ts) {
        currentStatus = "expiry";
      } else {
        currentStatus = "no_expiry";
      }
    } else if (drawer && "drawer" in drawer) {
      if (drawer.drawer === 0 || drawer.drawer === undefined) {
        currentStatus = "free";
      } else {
        currentStatus = "lock";
      }
    }
    return currentStatus;
  } else {
    return undefined;
  }
};
