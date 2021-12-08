import { createSelector } from "reselect";

const validateData = (symbol, data) => {
  if (data !== undefined && data !== null) {
    if (data[symbol]) {
      if (data[symbol].data) {
        return data[symbol].data;
      }
    }
  }
};

// ======================================================
// --------------- MAIN CANDLES - EVENTS ----------------
// ======================================================
export const selectorDataType = createSelector(
  (state, symbol, graphType, dataType) => dataType,
  (state, symbol, graphType) => graphType,
  (state, symbol) => symbol,
  state => state.app,
  (dataType, graphType, symbol, state) => {
    const data = state[dataType][graphType];
    return validateData(symbol, data);
  }
);
// ======================================================
// ----------------------- CANDLES ----------------------
// ======================================================

export const selectorSecCandle = createSelector(
  (state, symbol) => symbol,
  state => state.app.current.secCandle,
  (symbol, candles) => candles && candles[symbol]
);
export const selectorMinCandle = createSelector(
  (state, symbol, graphType) => graphType,
  (state, symbol) => symbol,
  state => state.app.current.minCandle,
  (graphType, symbol, candles) => validateData(symbol, candles)
);

export const selectorFiveMinuteCandle = createSelector(
  (state, symbol) => symbol,
  state => state.app.current.fiveMinuteCandle,
  (symbol, candles) => validateData(symbol, candles)
);

export const selectorFifteenMinuteCandle = createSelector(
  (state, symbol) => symbol,
  state => state.app.current.fifteenMinuteCandle,
  (symbol, candles) => validateData(symbol, candles)
);

export const selectorHourCandle = createSelector(
  (state, symbol) => symbol,
  state => state.app.current.hourCandle,
  (symbol, candles) => validateData(symbol, candles)
);

export const selectorDayCandle = createSelector(
  (state, symbol) => symbol,
  state => state.app.current.dayCandle,
  (symbol, candles) => validateData(symbol, candles)
);

// ======================================================
// ------------------------ MARKS -----------------------
// ======================================================

export const selectorMinMarks = createSelector(
  (state, symbol) => symbol,
  state => state.app.marks.minCandle,
  (symbol, marks) => validateData(symbol, marks)
);

export const selectorFiveMinuteMarks = createSelector(
  (state, symbol) => symbol,
  state => state.app.marks.fiveMinuteCandle,
  (symbol, marks) => validateData(symbol, marks)
);

export const selectorFifteenMinuteMarks = createSelector(
  (state, symbol) => symbol,
  state => state.app.marks.fifteenMinuteCandle,
  (symbol, marks) => validateData(symbol, marks)
);

export const selectorHourMarks = createSelector(
  (state, symbol) => symbol,
  state => state.app.marks.hourCandle,
  (symbol, marks) => validateData(symbol, marks)
);

export const selectorDayMarks = createSelector(
  (state, symbol) => symbol,
  state => state.app.marks.dayCandle,
  (symbol, marks) => validateData(symbol, marks)
);

// ======================================================
// ------------------------ EVENTS ----------------------
// ======================================================

export const selectorMinEvents = createSelector(
  (state, symbol) => symbol,
  state => state.app.events.minCandle,
  (symbol, events) => validateData(symbol, events)
);
export const selectorFiveMinuteEvents = createSelector(
  (state, symbol) => symbol,
  state => state.app.events.fiveMinuteCandle,
  (symbol, events) => validateData(symbol, events)
);
export const selectorFifteenMinuteEvents = createSelector(
  (state, symbol) => symbol,
  state => state.app.events.fifteenMinuteCandle,
  (symbol, events) => validateData(symbol, events)
);

export const selectorHourEvents = createSelector(
  (state, symbol) => symbol,
  state => state.app.events.hourCandle,
  (symbol, events) => validateData(symbol, events)
);

export const selectorDayEvents = createSelector(
  (state, symbol) => symbol,
  state => state.app.events.dayCandle,
  (symbol, events) => validateData(symbol, events)
);

// ======================================================
// -------------------- HISTORY UPDATE ------------------
// ======================================================

export const selectorHistoryUpdateMinCandle = createSelector(
  state => state.app.isHistoryUpdated.minCandle,
  isHistoryUpdated => isHistoryUpdated
);
export const selectorHistoryUpdateFiveMinuteCandle = createSelector(
  state => state.app.isHistoryUpdated.fiveMinuteCandle,
  isHistoryUpdated => isHistoryUpdated
);
export const selectorHistoryUpdateFifteenMinuteCandle = createSelector(
  state => state.app.isHistoryUpdated.fifteenMinuteCandle,
  isHistoryUpdated => isHistoryUpdated
);
export const selectorHistoryUpdateHourCandle = createSelector(
  state => state.app.isHistoryUpdated.hourCandle,
  isHistoryUpdated => isHistoryUpdated
);
export const selectorHistoryUpdateDayCandle = createSelector(
  state => state.app.isHistoryUpdated.dayCandle,
  isHistoryUpdated => isHistoryUpdated
);

// ======================================================
// ----------------------- DRAWING ----------------------
// ======================================================

export const selectorDrawAngle = createSelector(
  state => state.dashboard.drawAngle,
  drawAngle => drawAngle
);
export const selectorDrawLine = createSelector(
  state => state.dashboard.drawLine,
  drawLine => drawLine
);
export const selectorDrawCross = createSelector(
  state => state.dashboard.drawCross,
  drawCross => drawCross
);
export const selectorChangeGraphRange = createSelector(
  state => state.dashboard.changeGraphRange,
  changeGraphRange => changeGraphRange
);
export const selectorRemoveSelected = createSelector(
  state => state.dashboard.removeSelected,
  removeSelected => removeSelected
);
export const selectorRemoveAll = createSelector(
  state => state.dashboard.removeAll,
  otherDrawing => otherDrawing
);
export const selectorOtherDrawing = createSelector(
  state => state.dashboard.otherDrawing,
  otherDrawing => otherDrawing
);
export const selectorEventLocation = createSelector(
  state => state.dashboard.eventLocation,
  eventLocation => eventLocation
);

// ======================================================
// ------------------------ DATES -----------------------
// ======================================================

const selectRecordedDates = state => state.app.recordedDates.minCandle;
const selectSymbolType = state => state.dashboard.symbol_type;

export const selectorRecordedDates = createSelector(
  selectRecordedDates,
  selectSymbolType,
  (dates, symbol) => validateData(symbol, dates)
);

// ======================================================
// ----------------------- SYMBOLS ----------------------
// ======================================================
export const selectorSymbolType = createSelector(
  selectSymbolType,
  symbol => symbol
);

export const selectorSymbols = createSelector(
  state => state.app.symbols,
  symbols => {
    if (symbols !== null && symbols !== undefined) return symbols;
  }
);

// ======================================================
// ------------------- SHOP POSITIONS -------------------
// ======================================================
export const selectorShopPositionOpen = createSelector(
  state => state.app.shopPositions.open,
  pos_open => pos_open
);
export const selectorShopPositionClose = createSelector(
  state => state.app.shopPositions.close,
  pos_close => pos_close
);

// ======================================================
// ------------------- ALLOW DATA FLOW ------------------
// ======================================================
export const selectorAllowDataFlowMin = createSelector(
  state => state.app.allowDataFlow.minCandle,
  isAllowed => isAllowed
);
export const selectorAllowDataFlowFive = createSelector(
  state => state.app.allowDataFlow.fiveMinuteCandle,
  isAllowed => isAllowed
);
export const selectorAllowDataFlowFifteen = createSelector(
  state => state.app.allowDataFlow.fifteenMinuteCandle,
  isAllowed => isAllowed
);
export const selectorAllowDataFlowHour = createSelector(
  state => state.app.allowDataFlow.hourCnadle,
  isAllowed => isAllowed
);
export const selectorAllowDataFlowDay = createSelector(
  state => state.app.allowDataFlow.dayCandle,
  isAllowed => isAllowed
);

// ======================================================
// ------------------ LOAD INITIAL DATA -----------------
// ======================================================
export const selectorLoadInitialData = createSelector(
  state => state.app.loadInitialData,
  toLoad => toLoad
);