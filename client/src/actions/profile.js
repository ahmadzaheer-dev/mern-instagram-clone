import {
  PROFILE_CREATED,
  PROFILE_LOADED,
  PROFILE_ERR,
  CLEAR_PROFILE,
} from "./actionTypes";
import axios from "axios";
import { setAlert } from "./alert";

export const createProfile = (name, bio, website, phone) => async (
  dispatch
) => {
  console.log("Hello World");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = {
    name,
    bio,
    website,
    phone,
  };

  try {
    const res = await axios.post("/api/profile", body, config);
    dispatch({
      type: PROFILE_CREATED,
      payload: res.data,
    });

    dispatch(setAlert("Profile Created Successfully", "SUCCESS"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
    });
    dispatch(setAlert("Profile Creation Failed", "Danger"));
  }
};

export const getCurrentProfile = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const profile = await axios.get("/api/profile", config);
    dispatch({
      type: PROFILE_LOADED,
      payload: profile.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
    });
  }
};

export const uploadAvatar = () => (dispatch) => {};
