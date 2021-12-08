// debbuging for immer
// import { original } from "immer";

import { filter_by_symbol } from "../utils/helpers/filter_by_symbol";
import { filter_data_actions } from "../utils/helpers/filter_data_actions";
import { validate_history_data } from "../utils/helpers/validate_history_data";
import { get_action_type } from "../utils/helpers/get_action_type";
import { filter_duplicated_item } from "../utils/helpers/checkHistoryDupes";


import {
  GET_RECORDED_DATES,
  GET_TRADES
} from "./App.constants";


// ======================================================
// ---------------- GET REAL-TIME TRADES ----------------
// ======================================================
export const getTrades = data => {
  function filterItems(newState, type, graphType) {
    const { symbol, trades } = data;

    const candleType = trades[0].candleType;

    if (trades && trades.length) {
      switch (type) {
        case "events":
          const eventsList = newState.events[candleType];
          let newStateEvents = eventsList

          if (eventsList) {
            if (eventsList[symbol]) {
              const newEventsList = eventsList[symbol].data.slice();

              newEventsList.push(
                ...trades.filter(item => item.candleType === candleType)
              );

              newStateEvents = {
                ...eventsList,
                [symbol]: { data: newEventsList, symbol }
              };

            }
          }

          return { data: newStateEvents, type: candleType };


        case "marks":
          const eventsList_marks = newState.marks[candleType];

          let newStateMarks = {}
          let newMarksList = {}

          if (eventsList_marks) {
            if (eventsList_marks[symbol]) {

              newMarksList = eventsList_marks[symbol].data.slice();

              newMarksList.push(
                ...trades.filter(item => item.candleType === candleType)
              );

              newStateMarks = {
                ...eventsList_marks,
                [symbol]: { data: newMarksList, symbol }
              };
            }
          }

          return { data: newStateMarks, type: candleType };

        default:
          break;
      }
    }
  }

  return {
    type: GET_TRADES,
    payload: {
      events: (state, graphType) => filterItems(state, "events", graphType),
      marks: (state, graphType) => filterItems(state, "marks", graphType)
    }
  };
};

// ======================================================
// --------------------- GET HISTORY  -------------------
// ======================================================

export const getHistoryData = (data, candleType) => {
  const { symbol, history } = data;
  let newCandles = [];
  let newEvents = [];
  let newTrades = [];
  const actionType = get_action_type("history", candleType);

  if (history.allCandles && history.allCandles.length > 0) {
    newCandles = history.allCandles.slice();
  } else {
    newCandles = validate_history_data(
      history.candles,
      "candles",
      candleType
    );
  }

  if (history.allEvents && history.allEvents.length > 0) {
    newEvents = filter_duplicated_item(history.allEvents);
    
  } else {
    newEvents = validate_history_data(history.events, "events", candleType);
  }


  if (history.allTrades && history.allTrades.length > 0) {
    newTrades = filter_duplicated_item(history.allTrades);
    
  } else {
    newTrades = validate_history_data(history.trades, "trades", candleType);
  }

  // const newTrades = validate_history_data(history.trades, "trades", candleType);

  if (newTrades && newEvents) {
    // console.log("trades before: ", newTrades)
    // console.log("trades after: ", filter_duplicated_item(newTrades))
    newEvents.push(...newTrades);
  }

  const filterItems = (newState, type) => {
    if (newState.historyCounter[candleType]) {
      if (type === "candles") return newState["current"][candleType][symbol];
      return newState[type][candleType][symbol];
    }

    const helper = {
      symbol,
      type,
      newState,
      events: newEvents,
      candles: newCandles,
      candleType
    };

    const payload = filter_data_actions(helper);

    return payload;
  };

  return {
    type: actionType,
    payload: {
      current: state => filterItems(state, "candles"),
      marks: state => filterItems(state, "marks"),
      events: state => filterItems(state, "events"),
    }
  };
};

// ======================================================
// ----------------------- CANDLES ----------------------
// ======================================================

export const getRealtimeData = (data, candleType) => {
  const { symbol, data: candles, events } = data;
  const actionType = get_action_type("realTime", candleType);

  const filterItems = (newState, type) => {
    const helper = {
      symbol,
      type,
      newState,
      events,
      candles,
      candleType
    };

    const payload = filter_data_actions(helper);

    return payload;
  };

  return {
    type: actionType,
    payload: {
      current: state => filterItems(state, "candles"),
      marks: state => filterItems(state, "marks"),
      events: state => filterItems(state, "events")
    }
  };
};

// ======================================================
// ------------------------ DATES -----------------------
// ======================================================
export const getRecordedDates = ({ symbol, dates }) => {
  const filterRecordedDates = state => {
    let output;
    let newState = { ...state };

    let input = {
      newState,
      symbol,
      newData: { data: dates, symbol },
      listName: "recordedDates",
      candleType: "minCandle",
      dataType: "dates"
    };

    output = filter_by_symbol(input);
    return output;
  };

  return {
    type: GET_RECORDED_DATES,
    cb: state => filterRecordedDates(state)
  };
};



