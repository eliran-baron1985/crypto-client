import { SEND_SYMBOL_TYPE, ALLOW_DATA_FLOW } from "./Graph.constants";

export const sendSymbolType = symbol => {
  return {
    type: SEND_SYMBOL_TYPE,
    payload: symbol
  };
};

export const allowDataFlow = (graphType, isActive) => {
  return {
    type: ALLOW_DATA_FLOW,
    payload: { graphType, isActive }
  };
};
