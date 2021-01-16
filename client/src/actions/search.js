import { SEARCH_SUCCESS, SEARCH_FAIL, SEARCH_DEFAULT } from "./actionTypes";
import axios from "axios";

export const searchByUsername = (username) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(`/api/search/autofill/${username}`, config);
    dispatch({
      type: SEARCH_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_FAIL,
    });
  }
};

export const setSearchDefault = () => (dispatch) => {
  dispatch({
    type: SEARCH_DEFAULT,
  });
};
