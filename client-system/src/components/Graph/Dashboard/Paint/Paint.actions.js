import {
  DRAW_ANGLE,
  DRAW_LINE,
  DRAW_CROSS,
  CHANGE_GRAPH_RANGE,
  REMOVE_SELECTED,
  REMOVE_ALL,
  OTHER_DRAWING
} from "../Dashboard.constants";

export const drawAngle = isActive => {
  return {
    type: DRAW_ANGLE,
    payload: isActive
  };
};

export const drawLine = isActive => {
  return {
    type: DRAW_LINE,
    payload: isActive
  };
};
export const changeGraphRange = isActive => {
  return {
    type: CHANGE_GRAPH_RANGE,
    payload: isActive
  };
};
export const removeSelected = isActive => {
  return {
    type: REMOVE_SELECTED,
    payload: isActive
  };
};
export const removeAll = isActive => {
  return {
    type: REMOVE_ALL,
    payload: isActive
  };
};
export const drawCross = isActive => {
  return {
    type: DRAW_CROSS,
    payload: isActive
  };
};
export const otherDrawing = type => {
  return {
    type: OTHER_DRAWING,
    payload: type
  };
};
