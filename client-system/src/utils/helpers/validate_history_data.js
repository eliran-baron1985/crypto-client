import { filter_duplicated_item } from "./checkHistoryDupes";

export function validate_history_data(data, actionType, candleType) {
  const output = [];

  if (data && Object.keys(data).length !== 0) {
    Object.keys(data).map(key => {
      if (data[key] !== null && data[key] !== undefined && data[key].length) {
        output.push(...data[key]);
      }
      return true;
    });
  }

  if (output.length) {
    const newData = output.sort(sortByTime);
    // console.log(candleType)
    if (actionType === "candles") {
      if (candleType === "fifteenMinuteCandle") {
        return newData.slice(-1200);
      }

      if (candleType === "minCandle") {
        return newData.slice(-300).filter(item => item !== "5" || item !== "6");
      }


      return newData.slice(-300);
    } else if (actionType === "trades") {
      const filteredTrades = filter_duplicated_item(newData, candleType);

      return filteredTrades;
    } else {
      return filter_duplicated_item(newData);
    }
  }

  return null;
}

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
