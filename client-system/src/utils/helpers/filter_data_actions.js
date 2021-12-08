import { filter_by_symbol } from "./filter_by_symbol";

export function filter_data_actions({
  symbol,
  events,
  candles,
  candleType,
  newState,
  type
}) {
  let output;
  let marks = [];
  let newCandles;
  let newDateCandles;

  if (candles !== undefined && candles !== null && candles.length) {
    newCandles = candles.map(item => {
      newDateCandles = `${item.date} ${item.time}`;
      return { ...item, date: newDateCandles };
    });
  } else if (candles !== undefined && candles !== null) {
    newDateCandles = `${candles.date} ${candles.time}`;
    newCandles = [{ ...candles, date: newDateCandles }];
  }

  if (
    events !== null &&
    events !== undefined &&
    Object.keys(events).length !== 0
  ) {
    marks = events.filter(
      e =>
        e.name === "5" ||
        e.name === "6" ||
        e.name === "4.1" ||
        e.name === "3.1" ||
        e.name === "2.8" ||
        e.name === "2.6" ||
        e.name === "2.4" ||
        e.name === "2" ||
        e.name === "1.7" ||
        e.name === "1.5" ||
        e.name === "1.3" ||
        e.name === "4.2" ||
        e.name === "3.2" ||
        e.name === "2.7" ||
        e.name === "2.5" ||
        e.name === "2.3" ||
        e.name === "1.8" ||
        e.name === "1.6" ||
        e.name === "1.4" ||
        e.name === "1" ||
        e.name === "buy_open" ||
        e.name === "sell_open" ||
        e.name === "sell_close" ||
        e.name === "buy_close"
    );
  }

  const dataPayload = {
    candles: { data: newCandles, symbol }, // data = array
    events: { data: events, symbol }, // data = array
    marks: { data: marks, symbol } // data = array
  };

  const input = {
    candles: {
      newState,
      symbol,
      candleType,
      newData: dataPayload.candles,
      listName: "current",
      dataType: "candles"
    },
    events: {
      newState,
      symbol,
      candleType,
      newData: dataPayload.events,
      listName: "events",
      dataType: "events"
    },
    marks: {
      newState,
      symbol,
      candleType,
      newData: dataPayload.marks,
      listName: "marks",
      dataType: "marks"
    }
  };

  switch (type) {
    case "candles":
      output = filter_by_symbol(input.candles);
      break;
    case "marks":
      output = filter_by_symbol(input.marks);
      break;
    case "events":
      output = filter_by_symbol(input.events);
      break;

    default:
      break;
  }

  return output;
}
