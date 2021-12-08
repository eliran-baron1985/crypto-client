import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "../middleware/logger";
import rootReducers from "./root.reducer";

const middleware = [loggerMiddleware];
const preloadedState = {};

const store = createStore(
  rootReducers,
  preloadedState,
  applyMiddleware(...middleware)
);

export default store;
