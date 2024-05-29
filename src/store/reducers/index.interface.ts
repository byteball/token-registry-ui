import { IModalsStore } from "./modals.interface";
import { IDataStore } from "./data.interface";
import { ISettingsStore } from "./settings.interface";
import { IIssuersStore } from "./issuers.interface";

export interface IStore {
  modals: IModalsStore;
  data: IDataStore;
  settings: ISettingsStore;
  active: string | null;
  issuers: IIssuersStore;
  _persist?: any;
}
