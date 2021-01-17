import { FEED_LOADED, FEED_ERR, POST_LIKED } from "./actionTypes";
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

export const likePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${id}`);
    dispatch({
      type: POST_LIKED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.statusText);
  }
};
