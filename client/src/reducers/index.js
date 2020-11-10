import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alert";
const rootReducer = combineReducers({
  auth,
  alerts,
});

export default rootReducer;
