import {
  reduce_candles_length,
  reduce_events_length
} from "../helpers/reduce_data_length";

export function filter_by_symbol({
  newState, // obj - inital state
  symbol, // string - 'EURUSD'
  newData, // obj  - {data, symbol}
  listName, // string - 'current'
  candleType, // string - 'minCandle'
  dataType // string - 'candles
}) {
  //  ==========================================
  //  ====== if the newData is NOT exsit =======
  //  ==========================================
  // if (!newData.data && newData.data.length === 0) {
  if (!newData.data) {
    if (!newState[listName][candleType]) {
      return newState[listName][candleType];
    }

    return newState[listName][candleType];
    
  } else {
    if (dataType === "marks" || dataType === "events") {
      if (!newData.data.length) {
        return newState[listName][candleType];
      }
    }
  }

  //  ==========================================
  //  ======== if the list is NOT exsit ========
  //  ==========================================

  // list example => state.current.minCandle
  // create the data structure
  if (!newState[listName][candleType]) {
    let initalState = {
      [listName]: {
        [candleType]: {
          [symbol]: newData
        }
      }
    };

    return initalState[listName][candleType];
  }

  //  ==========================================
  //  =========== if the list exsit ============
  //  ==========================================

  // list example => state.current.minCandle
  let list = newState[listName][candleType];

  // as long as there is max 6 different symbols
  if (Object.keys(list).length <= 5) {
    // if the symbol exist
    if (list[symbol]) {
      // push the new data to the relevant array
      // example => state.current.minCandle.EURUSD.candles

      if (dataType === "candles") {
        if (newData.data.length > 1) {
          list[symbol].data.push(...newData.data);
        } else {
          list[symbol].data.push(newData.data[0]);
        }
      }

      if (dataType === "events" || dataType === "marks") {
        if (newData.data && newData.data.length > 0) {
          list[symbol].data.push(...newData.data);
        }
      }
    } else {
      // create an obj and assign the data to it - KEY: symbol, VALUE: payload
      // example => state.current.minCandle.EURUSD = [{}]

      list[symbol] = newData;
    }

    switch (dataType) {
      case "candles":
        list[symbol].data = reduce_candles_length(
          candleType,
          list[symbol].data
        );
        break;
      case "events":
        list[symbol].data = reduce_events_length(
          list[symbol].data,
          newState["current"][candleType][symbol].data,
          candleType
        );
        break;
      case "marks":
        list[symbol].data = reduce_events_length(
          list[symbol].data,
          newState["current"][candleType][symbol].data,
          candleType
        );
        break;
      default:
        break;
    }

    return list;
  } else {
    // if the list is already with 6 keys (symbols) - add the new data to the relevant symbol

    if (dataType === "candles") {
      if (newData.data.length > 1) {
        if (list[symbol]) {
          list[symbol].data.push(...newData.data);
        } else {
          list[symbol] = newData;
        }
      } else {
        if (list[symbol]) {
          list[symbol].data.push(newData.data[0]);
        } else {
          list[symbol] = newData;
        }
      }
    }

    if (dataType === "events" || dataType === "marks") {
      if (newData.data && newData.data.length > 0) {

        if (list[symbol]) {
          list[symbol].data.push(...newData.data);
        } else {
          list[symbol] = newData;
        }
      }
    }

    switch (dataType) {
      case "candles":
        list[symbol].data = reduce_candles_length(
          candleType,
          list[symbol].data
        );
        break;
      case "events":
        list[symbol].data = reduce_events_length(
          list[symbol].data,
          newState["current"][candleType][symbol].data,
          candleType
        );
        break;
      case "marks":
        list[symbol].data = reduce_events_length(
          list[symbol].data,
          newState["current"][candleType][symbol].data,
          candleType
        );
        break;

      default:
        break;
    }

    return list;
  }
}
