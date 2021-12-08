import { SHOW_EVENT_LOCATION } from "../Dashboard.constants";

export const showEventLocation = event => {
  return {
    type: SHOW_EVENT_LOCATION,
    payload: event
  };
};
