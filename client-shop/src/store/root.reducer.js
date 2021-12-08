import { combineReducers } from "redux";
import appReducer from "../App/App.reducer";

const rootReducer = combineReducers({
  app: appReducer
});

export default rootReducer;
