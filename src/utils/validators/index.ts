import symbol from "./symbol";
import asset from "./asset";
import description from "./description";
import drawer from "./drawer";
import decimals from "./decimals";
import support from "./support";
import { typeFields } from "../../global.interface";

export const validator = (
  value: string,
  type: typeFields,
  onSuccess: () => any,
  onError: () => any,
  maxValue?: number,
  minValue?: number
) => {
  switch (type) {
    case "symbol": {
      return symbol(
        value,
        onSuccess ? () => onSuccess() : undefined,
        onError ? () => onError() : undefined
      );
    }
    case "asset": {
      return asset(
        value,
        onSuccess ? () => onSuccess() : undefined,
        onError ? () => onError() : undefined
      );
    }
    case "drawer": {
      return drawer(
        value,
        onSuccess ? () => onSuccess() : undefined,
        onError ? () => onError() : undefined
      );
    }
    case "description": {
      return description(
        value,
        onSuccess ? () => onSuccess() : undefined,
        onError ? () => onError() : undefined
      );
    }
    case "decimals": {
      return decimals(
        value,
        onSuccess ? () => onSuccess() : undefined,
        onError ? () => onError() : undefined
      );
    }
    case "support": {
      return support(
        value,
        onSuccess ? () => onSuccess() : undefined,
        onError ? () => onError() : undefined,
        maxValue,
        minValue
      );
    }
  }
};
