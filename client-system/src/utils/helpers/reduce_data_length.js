import { filter_duplicated_item } from './checkHistoryDupes';

export const reduce_candles_length = (candleType, candles) => {
  const newData = [...candles].sort(sortByTime);

  switch (candleType) {
    case "minCandle":
    case "fifteenMinuteCandle":
      const redecuedFifteenCandles = newData.slice(-1200);
      return redecuedFifteenCandles;
    case "fiveMinuteCandle":
    case "hourCandle":
    case "dayCandle":
      const redecuedData = newData.slice(-300);
      return redecuedData;
    default:
      break;
  }
};

export const reduce_events_length = (events, candles, candleType) => {
  const newEvents = [...events];
  const newCandles = [...candles];

  const filteredItems = newEvents.filter(item => {
    // find if there is a duplicated item
    let dupeItem = null;
    const eDate = `${item.date} ${item.time}`;

    dupeItem = newCandles.find(el => eDate === el.date);

    // if there isn't
    if (dupeItem !== undefined) {
      // return the item

      //check for minCandle/fiveMinCandle
      if (candleType === "minCandle" || candleType === "fiveMinCandle") {
        // check for 5/6
        if (item.name === "5" || item.name === "6") {
          // don't return them
          return false;
        }
      }

      return true;
    } else {
      // don't return the item
      return false;
    }
  });

  return filter_duplicated_item(filteredItems);
};

const sortByTime = (a, b) => {
  const dateA = convertToValidDate(a.date);
  const dateB = convertToValidDate(b.date);

  return new Date(dateA) - new Date(dateB);
};

const convertToValidDate = date => {
  const partA = `${date.slice(0, 2)}`;
  const partB = `${date.slice(3, 5)}`;

  const newDate = date.replace(partB, partA);
  const newDate2 = newDate.replace(partA, partB);

  return newDate2;
};
