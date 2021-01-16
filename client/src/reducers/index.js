import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alert";
import feed from "./feed";
import profile from "./profile";
import post from "./post";
import search from "./search";
const rootReducer = combineReducers({
  auth,
  alerts,
  feed,
  profile,
  post,
  search,
});

export default rootReducer;
