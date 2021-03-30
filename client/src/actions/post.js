import axios from "axios";
import { POST_CREATED, POST_CHANGED } from "./actionTypes";
import { setAlert } from "./alert";

export const createPost = (image, caption) => async (dispatch) => {
  const data = new FormData();
  data.append("posts", image);
  data.append("caption", caption);
  try {
    const res = await axios.post("/api/post", data);
    dispatch({
      type: POST_CREATED,
      payload: res.data,
    });
    dispatch(setAlert("Post created successfully", "SUCCESS"));
  } catch (err) {
    dispatch(setAlert("Post creation failed", "DANGER"));
  }
};

export const setPost = (post) => (dispatch) => {
  dispatch({
    type: POST_CHANGED,
    payload: post,
  });
};
