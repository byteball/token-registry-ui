import { CHANGE_SIDEBAR_TYPE } from "../../types/settings";

export const changeSidebarType = (type: "assets" | "symbols") => ({
  type: CHANGE_SIDEBAR_TYPE,
  payload: type,
});
