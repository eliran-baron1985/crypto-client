import * as a from "../../App/App.constants";

export const get_action_type = (dataType, graphType) => {
    if(dataType === "realTime") {
        switch (graphType) {
            case "minCandle":
              return a.GET_MIN_CANDLE;
            case "fiveMinuteCandle":
              return a.GET_FIVE_MINUTE_CANDLE;
            case "fifteenMinuteCandle":
              return a.GET_FIFTEEN_MINUTE_CANDLE;
            case "hourCandle":
              return a.GET_HOUR_CANDLE;
            case "dayCandle":
              return a.GET_DAY_CANDLE;
        
            default:
              break;
          }
    }

    else if(dataType === "history") {
        switch (graphType) {
            case "minCandle":
              return a.GET_HISTORY_MIN_CANDLES;
            case "fiveMinuteCandle":
              return a.GET_HISTORY_FIVE_MIN_CANDLES;
            case "fifteenMinuteCandle":
              return a.GET_HISTORY_FIFTEEN_MIN_CANDLES;
            case "hourCandle":
              return a.GET_HISTORY_HOUR_CANDLES;
            case "dayCandle":
              return a.GET_HISTORY_DAY_CANDLES;
        
            default:
              break;
          }
    }


};
