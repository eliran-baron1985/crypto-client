import { createSelectorCreator, defaultMemoize } from 'reselect'
import isEqual from 'lodash.isequal'


// ======================================================
// -------------------- DEEP COMPARING ------------------
// ======================================================
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)

// ======================================================
// --------------------- TABLE EVENTS -------------------
// ======================================================
export const selectorTableEvents = createDeepEqualSelector(
  state => state.app.shopPositions.tableEvents,
  tableEvents => {
    if (tableEvents) return tableEvents;
  }
);

// ======================================================
// ------------------- SHOP POSITIONS -------------------
// ======================================================
export const selectorShopPositionOpen = createDeepEqualSelector(
  state => state.app.shopPositions.open,
  pos_open => pos_open
);
export const selectorShopPositionClose = createDeepEqualSelector(
  state => state.app.shopPositions.close,
  pos_close => pos_close
);
