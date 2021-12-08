// // -------------------- SEC CANDLE ------------------
// export const getSecCandle = ({ symbol, data: candles, events }) => {
//     const filterItems = (newState, type) => {
//       if (newState.current.secCandle === null) {
//         const payload = {
//           [symbol]: [candles]
//         };
  
//         return payload;
//       } else {
//         const payload = {
//           ...newState.current.secCandle,
//           [symbol]: [candles]
//         };
  
//         return payload;
//       }
//     };
  
//     return {
//       type: GET_SEC_CANDLE,
//       payload: {
//         currentSecCandle: state => filterItems(state, "candles")
//       }
//     };
//   };