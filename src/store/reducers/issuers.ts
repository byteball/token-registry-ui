import { AnyAction } from "redux";
import { ADD_ISSUER_INFO } from "../types/issuers";
import { IIssuersStore } from "./issuers.interface";

const initialState: IIssuersStore | null = {};

export const issuersReducer = (
	state: IIssuersStore = initialState,
	action: AnyAction
) => {
	switch (action.type) {
		case ADD_ISSUER_INFO: {
			const { asset, issuerInfo, ts } = action.payload;
			if (asset) {
				return ({
					...state, [asset]: {
						...issuerInfo,
						ts
					}
				});
			}
		}
		default: {
			return state;
		}
	}
};
