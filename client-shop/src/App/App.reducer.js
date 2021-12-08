import produce from "immer";
import { GET_HISTORY_POSITIONS, GET_TRADES } from "./App.constants";

export const initialState = {
  shopPositions: {
    open: null,
    close: null,
    tableEvents: { counter: 0 }
  }
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      // ======================================================
      // ------------- HISTORY POSITION EVENTS ----------------
      // ======================================================
      case GET_HISTORY_POSITIONS:
        const hisTableEvents = action.payload.tableEvents(draft);
        const hisShopOpen = action.payload.shopOpen(draft);
        const hisShopClose = action.payload.shopClose(draft);
        const prevCounterHis = draft.shopPositions.tableEvents.counter;


        draft.shopPositions.tableEvents = { ...hisTableEvents, counter: prevCounterHis + 1 };
        draft.shopPositions.open = hisShopOpen;
        draft.shopPositions.close = hisShopClose;

        break;

      // ======================================================
      // ------------------ REAL-TIME TRADES ------------------
      // ======================================================
      case GET_TRADES:
        const tableEvents = action.payload.tableEvents(draft);
        const shopOpen = action.payload.shopOpen(draft);
        const shopClose = action.payload.shopClose(draft);
        const prevCounter = draft.shopPositions.tableEvents.counter;

        draft.shopPositions.tableEvents = { ...tableEvents, counter: prevCounter + 1};
        draft.shopPositions.open = shopOpen;
        draft.shopPositions.close = shopClose;

        break;
      // ======================================================
      // ----------------------- DEFAULT ----------------------
      // ======================================================
      default:
        return state;
    }
  });
};
