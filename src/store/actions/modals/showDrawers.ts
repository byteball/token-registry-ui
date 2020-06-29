import {
  MODAL_CLOSE_SHOW_DRAWERS,
  MODAL_OPEN_SHOW_DRAWERS,
} from "../../types/modals";

export const showAllDrawersOpen = (type: "all" | "lock") => ({
  type: MODAL_OPEN_SHOW_DRAWERS,
  payload: type,
});

export const showAllDrawersClose = () => ({
  type: MODAL_CLOSE_SHOW_DRAWERS,
});
