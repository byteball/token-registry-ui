import { ICurrentSymbol } from "store/selectors/interfaces/currentSymbol.interface";

export interface ISelectorTabs {
  height: number;
  width: number;
  sidebarType: "assets" | "symbols";
  currentList: ICurrentSymbol[];
  currentDisputeList: ICurrentSymbol[];
  currentFavoriteList: ICurrentSymbol[];
}
