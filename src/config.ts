export default {
  TESTNET: process.env.REACT_APP_TESTNET === "true",
  ADDRESS: process.env.REACT_APP_TOKEN_REGISTRY!,
  PREDICTION_MARKET_BASE_AAS: (process.env.REACT_APP_PREDICTION_MARKET_BASE_AAS || "").split(","),
};
