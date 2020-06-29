import { ActionCreator, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import obyte from "obyte";

export interface ThunkActionWithArguments
  extends ActionCreator<ThunkAction<void, {}, obyte.Client, AnyAction>> {}
