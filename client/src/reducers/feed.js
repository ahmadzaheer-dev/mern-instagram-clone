import { FEED_LOADED, FEED_ERR } from "../actions/actionTypes";

const feed = (feed = [], action) => {
  const { type, payload } = action;

  if (type === FEED_LOADED) {
    return payload;
  } else if (type === FEED_ERR) {
    return [];
  }
  return feed;
};

export default feed;
