import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alert";
import feed from "./feed";
import profile from "./profile";
const rootReducer = combineReducers({
  auth,
  alerts,
  feed,
  profile,
});

export default rootReducer;
