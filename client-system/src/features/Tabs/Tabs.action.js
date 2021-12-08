import { CHANGE_CLOCK_TYPE } from "../../components/Graph/Dashboard/Dashboard.constants";

const changeClockType = type => ({
  type: CHANGE_CLOCK_TYPE,
  payload: type
});

export default changeClockType;
