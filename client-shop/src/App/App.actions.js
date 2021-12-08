import {
  RESET_SUBSCRIBED_SYMBOLS,
  GET_HISTORY_POSITIONS,
  GET_TRADES
} from "./App.constants";

import filter_duplicated_item from "../utils/helpers/filter_duplicated_item";

export const resetSubscribedSymbols = () => ({
  type: RESET_SUBSCRIBED_SYMBOLS,
  payload: true
});

// ======================================================
// ------------- HISTORY POSITION EVENTS ----------------
// ======================================================
export const getHistoryPositions = data => {
  function filterItems(newState, type) {
    const positions_open = filter_duplicated_item(
      data.positions_open,
      "hourCandle"
    );

    const positions_close = filter_duplicated_item(
      data.positions_close,
      "fifteenMinuteCandle"
    );

    const newPositions_events = filter_duplicated_item(
      data.positions_events,
      "hourCandle"
    );


    const positions_events = {};

    switch (type) {
      case "tableEvents":
        newPositions_events.map(item => {
          const findClosing = positions_close.find(p => {
            const typeOpen = item.name.length === 8 ? "buy" : "sell";
            const typeClose = p.name.length === 9 ? "buy" : "sell";

            if (
              p.openTime &&
              p.openDate &&
              p.openTime === item.time &&
              p.openDate === item.date &&
              p.symbol === item.symbol &&
              typeOpen === typeClose
            )
              return p;

            return false;
          });

          if (findClosing) {
            if (positions_events[item.lastName]) {
              positions_events[item.lastName].push({
                ...item,
                closingPos: findClosing.time
              });
            } else {
              positions_events[item.lastName] = [
                {
                  ...item,
                  closingPos: findClosing.time
                }
              ];
            }
            // =========================================
          } else {
            if (positions_events[item.lastName]) {
              positions_events[item.lastName].push(item);
            } else {
              positions_events[item.lastName] = [item];
            }
          }

          return true;
        });
        return positions_events;

      case "shopOpen":
        const helperOpen = {}
        positions_open.map(item => {
          if (helperOpen[item.lastName]) {
            helperOpen[item.lastName].push(item)
          } else {
            helperOpen[item.lastName] = [item];
          }
          return true;
        })
        return helperOpen;
      case "shopClose":
        return positions_close;

      default:
        break;
    }
  }

  return {
    type: GET_HISTORY_POSITIONS,
    payload: {
      tableEvents: state => filterItems(state, "tableEvents"),
      shopOpen: state => filterItems(state, "shopOpen"),
      shopClose: state => filterItems(state, "shopClose")
    }
  };
};

// ======================================================
// ------------------ REAL-TIME TRADES ------------------
// ======================================================
export const getTrades = data => {
  function filterItems(newState, type) {
    const { trades } = data;
    let tradesOpen = []
    let tradesClose = []
    // set new table events positions
    const positions_events = { ...newState.shopPositions.tableEvents };
    const positions_events_open = { ...newState.shopPositions.tableEvents };

    // find and seperate position = close/open
    trades.map(item => {
      if (item.timingPosition === "open" && item.candleType === "hourCandle") {
        tradesOpen.push(item);
      }
      if (item.timingPosition === "close" && item.candleType === "fifteenMinuteCandle") {
        tradesClose.push(item);
      }

      return true;
    });



    const openTrade = tradesOpen.length > 0 ? tradesOpen[0] : false;
    const closeTrade = tradesClose.length > 0 ? tradesClose[0] : false;
    let findOpenClosePair;

    if (trades) {
      switch (type) {
        case "tableEvents":
       

          // looping over the open table_events
          for (let keyEvent in positions_events_open) {
            // check if the payload is a close trade
            if (closeTrade && keyEvent !== "counter") {
              let openPosIndex = null;
              // find the open close pairs - return the open 
              findOpenClosePair = positions_events_open[keyEvent].find((open, index) => {
                // compare types of buy and sell
                const typeOpen = open.name.length === 8 ? "buy" : "sell";
                const typeClose = closeTrade.name.length === 9 ? "buy" : "sell";

                if (
                  closeTrade.openTime &&
                  closeTrade.openTime === open.time &&
                  closeTrade.symbol === open.symbol &&
                  typeOpen === typeClose
                ) {
                  openPosIndex = index;
                  return {
                    ...open,
                    closingPos: closeTrade.time
                  };
                }

                return false;
              })


              if (findOpenClosePair) {
                if (keyEvent === findOpenClosePair.lastName) {

                  if (positions_events[keyEvent]) {
                    positions_events[keyEvent].splice(openPosIndex, 1, findOpenClosePair);
                  } else {
                    positions_events[keyEvent] = [
                      {
                        ...findOpenClosePair,
                        closingPos: closeTrade.time
                      }
                    ];
                  }
                }
              }
            }

            if (openTrade) {
              if (keyEvent === openTrade.lastName) {
                if (positions_events[keyEvent]) {
                  positions_events[keyEvent].push(openTrade);
                } else {
                  positions_events[keyEvent] = [openTrade];
                }
              }
            }
          }

          return positions_events;

        case "shopOpen":
          const shopOpen = { ...newState.shopPositions.open };


          tradesOpen.map(item => {
            if (shopOpen[item.lastName]) {
              shopOpen[item.lastName].push(item)
            } else {
              shopOpen[item.lastName] = [item];
            }

            return true;
          })

          return shopOpen

        case "shopClose":
          const shopClose = newState.shopPositions.close.slice();
          shopClose.push(...tradesClose);

          return shopClose

        default:
          break;
      }
    }
  }

  return {
    type: GET_TRADES,
    payload: {
      tableEvents: state => filterItems(state, "tableEvents"),
      shopOpen: state => filterItems(state, "shopOpen"),
      shopClose: state => filterItems(state, "shopClose")
    }
  };
};
