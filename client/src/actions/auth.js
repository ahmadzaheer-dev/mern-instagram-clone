import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOAD_SUCCESS,
  LOAD_FAIL,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AVATAR_SUCCESS,
} from "./actionTypes";
import axios from "axios";
import setGlobalAuthToken from "../utils/setToken";
import { setAlert } from "./alert";

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/user/login", body, config);
    setGlobalAuthToken(res.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const body = {
    username,
    email,
    password,
  };

  try {
    const res = await axios.post("/api/user/register", body, config);
    setGlobalAuthToken(res.data.token);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    setGlobalAuthToken(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const user = await axios.get("/api/user", config);
      dispatch({
        type: LOAD_SUCCESS,
        payload: {
          token: token,
          user: user.data,
        },
      });
    } catch (error) {
      dispatch({
        type: LOAD_FAIL,
      });
    }
  } else {
    dispatch({
      type: LOAD_FAIL,
    });
  }
};

export const setAvatar = (avatar) => async (dispatch) => {
  console.log("Hello World");
  const data = new FormData();
  data.append("avatars", avatar);
  try {
    const res = await axios.post("/api/user/avatar", data);
    dispatch({
      type: AVATAR_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert("Avatar uploaded successfully", "SUCCESS"));
  } catch (err) {
    dispatch(setAlert("Avatar upload failed", "DANGER"));
  }
};

export const changePassword = (oldPassword, newPassword) => async (
  dispatch
) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const body = {
    oldPassword,
    newPassword,
  };

  try {
    await axios.patch("/api/password/change", body, config);
    dispatch(setAlert("Password Changed", "SUCCESS"));
  } catch (err) {
    dispatch(setAlert("Password change failed", "DANGER"));
  }
};
