const filter_duplicated_item = (array, candleType) => {
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

export default filter_duplicated_item;
