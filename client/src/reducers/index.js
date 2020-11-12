import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alert";
import feed from "./feed";
const rootReducer = combineReducers({
  auth,
  alerts,
  feed,
});

export default rootReducer;
