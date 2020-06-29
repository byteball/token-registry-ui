import {
  MODAL_OPEN_CREATE_TOKEN,
  MODAL_CLOSE_CREATE_TOKEN,
  MODAL_CLOSE_ADD_SUPPORT,
  MODAL_OPEN_ADD_SUPPORT,
  MODAL_CHECK_CREATE_TOKEN,
  MODAL_CLEAR_CREATE_TOKEN,
  MODAL_CLEAR_ADD_SUPPORT,
  MODAL_OPEN_SHOW_DRAWERS,
  MODAL_CLOSE_SHOW_DRAWERS,
  MODAL_OPEN_EDIT_INFO,
  MODAL_CLOSE_EDIT_INFO,
  MODAL_OPEN_ADD_WALLET,
  MODAL_CLOSE_ADD_WALLET,
  MODAL_OPEN_WITHDRAW,
  MODAL_CLOSE_WITHDRAW,
} from "../types/modals";
import { IModals, IModalsStore } from "./modals.interface";
import { AnyAction } from "redux";

const initModalProperty: IModals = {
  visible: false,
  loading: false,
};

const initialState: IModalsStore = {
  createToken: {
    ...initModalProperty,
    check: null,
    minSupport: undefined,
    asset: undefined,
    symbol: undefined,
  },
  addSupport: {
    ...initModalProperty,
    symbol: undefined,
    asset: undefined,
  },
  showDrawers: { ...initModalProperty, type: undefined },
  editInfo: {
    ...initModalProperty,
    symbol: undefined,
    decimals: undefined,
    description: undefined,
    isEdit: false,
  },
  addWallet: {
    ...initModalProperty,
  },
  withdraw: {
    ...initModalProperty,
  },
};

export const modalsReducer = (
  state: IModalsStore = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case MODAL_OPEN_CREATE_TOKEN: {
      return {
        ...state,
        createToken: {
          ...state.createToken,
          asset: action.payload ? action.payload.asset : undefined,
          symbol: action.payload ? action.payload.symbol : undefined,
          visible: true,
        },
      };
    }
    case MODAL_CLOSE_CREATE_TOKEN: {
      return {
        ...state,
        createToken: {
          ...state.createToken,
          visible: false,
        },
      };
    }
    case MODAL_CHECK_CREATE_TOKEN: {
      return {
        ...state,
        createToken: {
          ...state.createToken,
          check: action.payload,
          minSupport: action.meta,
        },
      };
    }
    case MODAL_CLEAR_CREATE_TOKEN: {
      return {
        ...state,
        createToken: {
          ...state.createToken,
          check: null,
          minSupport: undefined,
          asset: undefined,
          symbol: undefined,
        },
      };
    }
    case MODAL_OPEN_ADD_SUPPORT: {
      return {
        ...state,
        addSupport: {
          ...state.addSupport,
          asset: action.payload.asset,
          symbol: action.payload.symbol,
          visible: true,
        },
      };
    }
    case MODAL_CLEAR_ADD_SUPPORT: {
      return {
        ...state,
        addSupport: initialState.addSupport,
        asset: undefined,
        symbol: undefined,
      };
    }
    case MODAL_CLOSE_ADD_SUPPORT: {
      return {
        ...state,
        addSupport: {
          ...state.addSupport,
          visible: false,
        },
      };
    }
    case MODAL_OPEN_SHOW_DRAWERS: {
      return {
        ...state,
        showDrawers: {
          visible: true,
          type: action.payload,
        },
      };
    }
    case MODAL_CLOSE_SHOW_DRAWERS: {
      return {
        ...state,
        showDrawers: {
          ...state.showDrawers,
          visible: false,
        },
      };
    }
    case MODAL_OPEN_EDIT_INFO: {
      const { symbol, description, decimals, isEdit } = action.payload;
      return {
        ...state,
        editInfo: {
          ...state.editInfo,
          visible: true,
          symbol,
          decimals,
          description,
          isEdit,
        },
      };
    }
    case MODAL_CLOSE_EDIT_INFO: {
      return {
        ...state,
        editInfo: {
          ...state.editInfo,
          visible: false,
        },
      };
    }
    case MODAL_OPEN_ADD_WALLET: {
      return {
        ...state,
        addWallet: {
          ...state.addWallet,
          visible: true,
        },
      };
    }
    case MODAL_CLOSE_ADD_WALLET: {
      return {
        ...state,
        addWallet: {
          ...state.addWallet,
          visible: false,
        },
      };
    }
    case MODAL_OPEN_WITHDRAW: {
      return {
        ...state,
        withdraw: {
          ...state.withdraw,
          visible: true,
        },
      };
    }
    case MODAL_CLOSE_WITHDRAW: {
      return {
        ...state,
        withdraw: {
          ...state.withdraw,
          visible: false,
        },
      };
    }
    default:
      return state;
  }
};
