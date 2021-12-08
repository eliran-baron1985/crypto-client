import { combineReducers } from "redux";
import appReducer from "../App/App.reducer";
import dashboardReducer from "../components/Graph/Dashboard/Dashboard.reducer";

const rootReducer = combineReducers({
  app: appReducer,
  dashboard: dashboardReducer
});

export default rootReducer;