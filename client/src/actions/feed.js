import { FEED_LOADED, FEED_ERR } from "./actionTypes";
import axios from "axios";

export const loadFeed = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get("/api/feed", config);
    dispatch({
      type: FEED_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FEED_ERR,
    });
  }
};
