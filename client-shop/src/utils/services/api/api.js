import io from "socket.io-client";

const socket = io("http://localhost:8000");

socket.on("connect", () => {
  console.log("socket connected: ", new Date().toLocaleTimeString());
  console.log("subscribe to shop channel: ", new Date().toLocaleTimeString());
  subscribeShop()
});

socket.on("connect_error", error => {
  console.log("connect_error: ", error);
});

socket.on("connect_timeout", timeout => {
  console.log("connect_timeout: ", timeout);
});

socket.on("error", error => {
  console.log("error: ", error);
});

socket.on("disconnect", reason => {
  console.log("socket disconnect at:", new Date().toLocaleTimeString());
  console.log("socket disconnect reason: ", reason);
});

socket.on("reconnect_error", error => {
  console.log("reconnect_error: ", error);
});

socket.on("reconnect_failed", () => {
  console.log("reconnect_failed");
});

// ====================================================== 
// ---------------------- SUBSCRIBE ---------------------
// ======================================================
export function subscribeShop() {
  socket.emit("subscribeShop", {});
  console.log("subscribe shop")
}

// ======================================================
// ---------------------- SEND DATA ---------------------
// ======================================================
export function getDataToGlobalStore(cb) {
  socket.on("shop", data => {
    return cb(null, data);
  });
}

// ====================================================== 
// ----------------------- HISTORY ----------------------
// ======================================================
export function historyPositionsEvents() {
  socket.emit("historyPositions", {});
}

