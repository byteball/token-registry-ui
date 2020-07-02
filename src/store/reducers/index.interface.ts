import { IModalsStore } from "./modals.interface";
import { IDataStore } from "./data.interface";
import { ISettingsStore } from "./settings.interface";

export interface IStore {
  modals: IModalsStore;
  data: IDataStore;
  settings: ISettingsStore;
  active: string | null;
  _persist?: any;
}
