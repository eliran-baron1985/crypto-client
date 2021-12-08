import dateformat from "dateformat";

export function checkHistoryDupes(newData, stateData, checkType) {
  const newStateData = [...stateData];

  if (newStateData !== undefined && newStateData !== null) {
    const filteredItems = newStateData.filter(item => {
      // find if there is a duplicated item
      let dupeItem = null;

      if (checkType === "events") {
        dupeItem = newData.find(
          el =>
            el.time === item.time &&
            el.date === item.date &&
            el.name === item.name
        );
      } else {
        dupeItem = newData.find(
          el => el.insertTime === item.insertTime && el.date === item.date
        );
      }

      // if there isn't
      if (dupeItem !== undefined) {
        // return the item
        return false;
      } else {
        // don't return the item
        return true;
      }
    });

    return filteredItems;
  }
}

export const filter_duplicated_item = (array, candleType) => {
  const newArray = [...array];

  if (candleType !== undefined) {
    return newArray.filter(
      (thing, index, self) =>
        index ===
        self.findIndex(
          t =>
            t.time === thing.time &&
            t.name === thing.name &&
            t.date === thing.date &&
            t.symbol === thing.symbol &&
            t.candleType === candleType
        )
    );
  }

  return newArray.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(
        t =>
          t.time === thing.time &&
          t.name === thing.name &&
          t.date === thing.date &&
          t.symbol === thing.symbol
      )
  );
};

export const time_up_trades = (trades, graphType) => {
  const newTrades = [...trades];

  return newTrades.map(item => {
    let result = 0;
    let newDate = null;

    const date2 = convertToValidDate(`${item.date} ${item.time}`);

    const date = new Date(date2).getMinutes();
    const res = (date % graphType) - graphType;

    if (res < 0) {
      result = res.toString().slice(1);
      newDate = new Date(date2).setMinutes(Number(result) + date);
    }

    if (res > 0) {
      if (res === -5) {
        result = 0;
        newDate = new Date(date2).setMinutes(Number(result) + date);
      } else {
        result = res.toString().slice(1);
        newDate = new Date(date2).setMinutes(Number(result) + date);
      }
    }

    const dateBefore = dateformat(new Date(newDate), "dd-mm-yyyy HH:MM");

    const dateTime = `${dateBefore.slice(0, 10)}`;
    const time = `${dateBefore.slice(11, 16)}`;

    return {
      ...item,
      time,
      date: dateTime
    };
  });
};

function convertToValidDate(date) {
  const partA = `${date.slice(0, 2)}`;
  const partB = `${date.slice(3, 5)}`;

  const newDate = date.replace(partB, partA);
  const newDate2 = newDate.replace(partA, partB);

  return newDate2;
}
