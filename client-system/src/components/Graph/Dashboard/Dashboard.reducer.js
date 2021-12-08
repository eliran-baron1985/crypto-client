import {
  CHANGE_CLOCK_TYPE,
  DRAW_ANGLE,
  DRAW_LINE,
  DRAW_CROSS,
  CHANGE_GRAPH_RANGE,
  REMOVE_SELECTED,
  REMOVE_ALL,
  OTHER_DRAWING,
  SHOW_EVENT_LOCATION
} from "./Dashboard.constants";
import { SEND_SYMBOL_TYPE } from "../Graph.constants";

let initialState = {
  clock_type: "isADay",
  symbol_type: null,
  drawAngle: false,
  drawLine: false,
  drawCross: false,
  changeGraphRange: false,
  removeSelected: false,
  removeAll: false,
  otherDrawing: "",
  eventLocation: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CLOCK_TYPE:
      return {
        ...state,
        clock_type: action.payload
      };
    case SEND_SYMBOL_TYPE:
      return {
        ...state,
        symbol_type: action.payload
      };
    case DRAW_ANGLE:
      return {
        ...state,
        drawAngle: action.payload
      };
    case DRAW_LINE:
      return {
        ...state,
        drawLine: action.payload
      };
    case DRAW_CROSS:
      return {
        ...state,
        drawCross: action.payload
      };
    case CHANGE_GRAPH_RANGE:
      return {
        ...state,
        changeGraphRange: action.payload
      };
    case REMOVE_SELECTED:
      return {
        ...state,
        removeSelected: action.payload
      };
    case REMOVE_ALL:
      return {
        ...state,
        removeAll: action.payload
      };
    case OTHER_DRAWING:
      return {
        ...state,
        otherDrawing: action.payload
      };
    case SHOW_EVENT_LOCATION:
      return {
        ...state,
        eventLocation: action.payload
      };
    default:
      return state;
  }
};
