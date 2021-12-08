import io from "socket.io-client";
import store from "../../store/store";
import { LOAD_INITIAL_DATA } from "../../App/App.constants";

const socket = io("http://localhost:8000");


// ======================================================
// ---------------------- CONNECTION --------------------
// ======================================================
socket.on("connect", () => {
  console.log("SOCKET IO CONNECTED");

  // only after socket connection, ask for history data
  store.dispatch({
    type: LOAD_INITIAL_DATA,
    payload: true
  });
});

// ======================================================
// -------------------- ERROR HANDLING ------------------
// ======================================================
socket.on("connect_error", error => {
  console.log("connect_error: ", error);
});

socket.on("error", error => {
  console.log("error: ", error);
});

socket.on("reconnect_failed", () => {
  console.log("reconnect_failed");
});

socket.on("disconnect", reason => {
  console.log("disconnect: ", reason);
});

socket.on("reconnect_error", error => {
  console.log("reconnect_error: ", error);
});

socket.on("connect_timeout", timeout => {
  console.log("connect_timeout: ", timeout);
});


// ======================================================
// ---------------------- SEND DATA ---------------------
// ======================================================

// LISTEN TO THE SERVER AND GET THE DATA
// paramater:
// cb = callback to update the data to the global state
export function getDataToGlobalStore(cb) {
  console.error("conected getData=>api")
  socket.on("msg", data => {
    return cb(null, data);
  });
}

export function getTrades(cb) {
  socket.on("trades", data => {
    return cb(null, data);
  });
}

// ======================================================
// ---------------------- SUBSCRIBE ---------------------
// ======================================================
export function requestedSymbols(clientData) {
  if (clientData) {
    socket.emit("requestedSymbols", clientData);
  }

  console.log("request symbols: ", clientData)
}


// ======================================================
// ------------------------ DATES -----------------------
// ======================================================
export function dates(symbol) {
  const params = {
    symbol
  };

  socket.emit("dates", params);
}

// ======================================================
// ----------------------- HISTORY ----------------------
// ======================================================
export function historyCandles({ timeType, symbol }) {
  const params = { symbol };

  switch (timeType) {
    case "01":
      socket.emit("historyMin", params);
      break;
    case "05":
      socket.emit("historyFiveMin", params);
      break;
    case "15":
      socket.emit("historyFifteenMin", params);
      break;
    case "1h":
      socket.emit("historyHour", params);
      break;
    case "1d":
      socket.emit("historyDay", params);
      break;

    default:
      break;
  }
}

export function historyPositionsEvents() {
  socket.emit("historyPositions", {});
}
