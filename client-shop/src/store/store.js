import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "../middleware/logger";
// import { save_state_locally, get_local_state } from "../middleware/local.saver";
import rootReducers from "./root.reducer";


// const middleware = [thunk, save_state_locally, loggerMiddleware]; 
const middleware = [loggerMiddleware];

// const preloadedState = get_local_state();
const preloadedState = {};

const store = createStore(
  rootReducers,
  preloadedState,
  applyMiddleware(...middleware)
);

export default store;
