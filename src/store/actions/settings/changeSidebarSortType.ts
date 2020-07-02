import { CHANGE_SIDEBAR_SORT_TYPE } from "../../types/settings";

export const changeSidebarSortType = (type: "AZ" | "SUPPORT") => ({
  type: CHANGE_SIDEBAR_SORT_TYPE,
  payload: type,
});
