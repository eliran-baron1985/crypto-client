import produce from "immer";
import { ALLOW_DATA_FLOW } from "../components/Graph/Graph.constants";

import {
  GET_RECORDED_DATES,
  GET_SEC_CANDLE,
  GET_MIN_CANDLE,
  GET_FIVE_MINUTE_CANDLE,
  GET_FIFTEEN_MINUTE_CANDLE,
  GET_HOUR_CANDLE,
  GET_DAY_CANDLE,
  GET_HISTORY_MIN_CANDLES,
  GET_HISTORY_FIVE_MIN_CANDLES,
  GET_HISTORY_FIFTEEN_MIN_CANDLES,
  GET_HISTORY_HOUR_CANDLES,
  GET_HISTORY_DAY_CANDLES,
  GET_TRADES,
  LOAD_INITIAL_DATA,
  RECONNECT_SOCKET_IO
} from "./App.constants";

export const initialState = {
  reconnectSocket: false,
  loadInitialData: false,
  trades: {
    minCandle: null,
    fiveMinuteCandle: null,
    fifteenMinuteCandle: null,
    hourCandle: null,
    dayCandle: null
  },
  isHistoryUpdated: {
    minCandle: false,
    fiveMinuteCandle: false,
    fifteenMinuteCandle: false,
    hourCandle: false,
    dayCandle: false
  },
  historyCounter: {
    minCandle: false,
    fiveMinuteCandle: false,
    fifteenMinuteCandle: false,
    hourCandle: false,
    dayCandle: false
  },
  allowDataFlow: {
    minCandle: false,
    fiveMinuteCandle: false,
    fifteenMinuteCandle: false,
    hourCandle: false,
    dayCandle: false
  },
  recordedDates: {
    minCandle: null,
    fiveMinuteCandle: null,
    fifteenMinuteCandle: null,
    hourCandle: null,
    dayCandle: null
  },
  marks: {
    minCandle: null,
    fiveMinuteCandle: null,
    fifteenMinuteCandle: null,
    hourCandle: null,
    dayCandle: null
  },
  events: {
    minCandle: null,
    fiveMinuteCandle: null,
    fifteenMinuteCandle: null,
    hourCandle: null,
    dayCandle: null
  },
  current: {
    secCandle: null,
    minCandle: null,
    fiveMinuteCandle: null,
    fifteenMinuteCandle: null,
    hourCandle: null,
    dayCandle: null
  }
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      // ======================================================
      // ------------------------ TRADES ----------------------
      // ======================================================
      case LOAD_INITIAL_DATA:
        draft.loadInitialData = !draft.loadInitialData

        break;

      // ======================================================
      // ------------------------ TRADES ----------------------
      // ======================================================
      case GET_TRADES:
        const tradesTypes = { fifteenMinuteCandle: "fifteenMinuteCandle", hourCandle: "hourCandle" }

        const tradesEvents = action.payload.events(draft, tradesTypes);
        const tradesMarks = action.payload.marks(draft, tradesTypes);

        if (tradesEvents.data) {
          draft.events[tradesEvents.type] = tradesEvents.data;
        }

        if (tradesMarks.data) {
          draft.marks[tradesMarks.type] = tradesMarks.data;
        }

        break;

      // ======================================================
      // ------------------------ DATES -----------------------
      // ======================================================
      case GET_RECORDED_DATES:
        draft.recordedDates.minCandle = action.cb(draft);
        break;

      // ======================================================
      // -------------------- HISTORY UPDATE ------------------
      // ======================================================

      // -------------------- MIN CANDLE ------------------
      case GET_HISTORY_MIN_CANDLES:
        const historyCurrentMinCandle = action.payload.current(draft);
        const historyEventsMinCandle = action.payload.events(draft);
        const historyMarksMinCandle = action.payload.marks(draft);

        if (draft.current.minCandle === null) {
          draft.current.minCandle = historyCurrentMinCandle;
          draft.events.minCandle = historyEventsMinCandle;
          draft.marks.minCandle = historyMarksMinCandle;
          draft.historyCounter.minCandle = true;
        }

        draft.isHistoryUpdated.minCandle = !draft.isHistoryUpdated.minCandle;
        break;

      // -------------------- FIVE MIN CANDLE ------------------
      case GET_HISTORY_FIVE_MIN_CANDLES:
        const historyCurrentFiveMinuteCandle = action.payload.current(draft);
        const historyEventsFiveMinuteCandle = action.payload.events(draft);
        const historyMarksFiveMinuteCandle = action.payload.marks(draft);

        if (draft.current.fiveMinuteCandle === null) {
          draft.current.fiveMinuteCandle = historyCurrentFiveMinuteCandle;
          draft.events.fiveMinuteCandle = historyEventsFiveMinuteCandle;
          draft.marks.fiveMinuteCandle = historyMarksFiveMinuteCandle;
          draft.historyCounter.fiveMinuteCandle = true;
        }

        draft.isHistoryUpdated.fiveMinuteCandle = !draft.isHistoryUpdated
          .fiveMinuteCandle;
        break;

      // -------------------- FIFTEEN MIN CANDLE ------------------
      case GET_HISTORY_FIFTEEN_MIN_CANDLES:
        const historyCurrentFifteenMinuteCandle = action.payload.current(draft);
        const historyEventsFifteenMinuteCandle = action.payload.events(draft);
        const historyMarksFifteenMinuteCandle = action.payload.marks(draft);

        if (draft.current.fifteenMinuteCandle === null) {
          draft.current.fifteenMinuteCandle = historyCurrentFifteenMinuteCandle;
          draft.events.fifteenMinuteCandle = historyEventsFifteenMinuteCandle;
          draft.marks.fifteenMinuteCandle = historyMarksFifteenMinuteCandle;
          draft.historyCounter.fifteenMinuteCandle = true;
        }

        draft.isHistoryUpdated.fifteenMinuteCandle = !draft.isHistoryUpdated
          .fifteenMinuteCandle;
        break;

      // -------------------- HOUR CANDLE ------------------
      case GET_HISTORY_HOUR_CANDLES:
        const historyCurrentHourCandle = action.payload.current(draft);
        const historyEventsHourCandle = action.payload.events(draft);
        const historyMarksHourCandle = action.payload.marks(draft);

        if (draft.current.hourCandle === null) {
          draft.current.hourCandle = historyCurrentHourCandle;
          draft.events.hourCandle = historyEventsHourCandle;
          draft.marks.hourCandle = historyMarksHourCandle;
          draft.historyCounter.hourCandle = true;
        }

        draft.isHistoryUpdated.hourCandle = !draft.isHistoryUpdated.hourCandle;

        break;

      // -------------------- DAY CANDLE ------------------
      case GET_HISTORY_DAY_CANDLES:
        const historyCurrentDayCandle = action.payload.current(draft);
        const historyEventsDayCandle = action.payload.events(draft);
        const historyMarksDayCandle = action.payload.marks(draft);

        if (draft.current.dayCandle === null) {
          draft.current.dayCandle = historyCurrentDayCandle;
          draft.events.dayCandle = historyEventsDayCandle;
          draft.marks.dayCandle = historyMarksDayCandle;
          draft.historyCounter.dayCandle = true;
        }
        draft.isHistoryUpdated.dayCandle = !draft.isHistoryUpdated.dayCandle;

        break;

      // ======================================================
      // ----------------------- CANDLES ----------------------
      // ======================================================

      // -------------------- SEC CANDLE ------------------
      case GET_SEC_CANDLE:
        const currentSecCandle = action.payload.current(draft);
        draft.current.secCandle = currentSecCandle;

        break;

      // -------------------- MIN CANDLE ------------------
      case GET_MIN_CANDLE:
        const currentMinCandle = action.payload.current(draft);
        const eventsMinCandle = action.payload.events(draft);
        const marksMinCandle = action.payload.marks(draft);

        draft.current.minCandle = currentMinCandle;
        draft.events.minCandle = eventsMinCandle;
        draft.marks.minCandle = marksMinCandle;

        break;

      // -------------------- FIVE MIN CANDLE ------------------
      case GET_FIVE_MINUTE_CANDLE:
        const currentFiveMinuteCandle = action.payload.current(draft);
        const eventsFiveMinuteCandle = action.payload.events(draft);
        const marksFiveMinuteCandle = action.payload.marks(draft);

        draft.current.fiveMinuteCandle = currentFiveMinuteCandle;
        draft.events.fiveMinuteCandle = eventsFiveMinuteCandle;
        draft.marks.fiveMinuteCandle = marksFiveMinuteCandle;

        break;

      // -------------------- FIFTEEN MIN CANDLE ------------------
      case GET_FIFTEEN_MINUTE_CANDLE:
        const currentFifteenMinuteCandle = action.payload.current(draft);
        const eventsFifteenMinuteCandle = action.payload.events(draft);
        const marksFifteenMinuteCandle = action.payload.marks(draft);

        draft.current.fifteenMinuteCandle = currentFifteenMinuteCandle;
        draft.events.fifteenMinuteCandle = eventsFifteenMinuteCandle;
        draft.marks.fifteenMinuteCandle = marksFifteenMinuteCandle;
        break;

      // -------------------- HOUR CANDLE ------------------
      case GET_HOUR_CANDLE:
        const currentHourCandle = action.payload.current(draft);
        const eventsHourCandle = action.payload.events(draft);
        const marksHourCandle = action.payload.marks(draft);

        draft.current.hourCandle = currentHourCandle;
        draft.events.hourCandle = eventsHourCandle;
        draft.marks.hourCandle = marksHourCandle;

        break;

      // -------------------- DAY CANDLE ------------------
      case GET_DAY_CANDLE:
        const currentDayCandle = action.payload.current(draft);
        const eventsDayCandle = action.payload.events(draft);
        const marksDayCandle = action.payload.marks(draft);

        draft.current.dayCandle = currentDayCandle;
        draft.events.dayCandle = eventsDayCandle;
        draft.marks.dayCandle = marksDayCandle;
        break;

      // ---------------------- ALLOW DATA FLOW --------------------
      case ALLOW_DATA_FLOW:
        draft.allowDataFlow[action.payload.graphType] = action.payload.isActive;

        // if isActive === false, remove the data
        if (action.payload.isActive === false) {
          draft.current[action.payload.graphType] = null;
          draft.events[action.payload.graphType] = null;
          draft.marks[action.payload.graphType] = null;
        }

        break;

      // -------------------- RECONNECT SOCKET IO ------------------
      case RECONNECT_SOCKET_IO:
        draft.reconnectSocket = !draft.reconnectSocket;

        break;

      // ======================================================
      // ----------------------- DEFAULT ----------------------
      // ======================================================
      default:
        return draft;
    }
  });
};
