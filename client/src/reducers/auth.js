import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOAD_SUCCESS,
  LOAD_FAIL,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AVATAR_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  isLoading: true,
};

const auth = (auth = initialState, action) => {
  const { type, payload } = action;
  if (type === LOGIN_SUCCESS) {
    localStorage.setItem("token", payload.token);
    return {
      ...auth,
      token: payload.token,
      user: payload.user,
      isAuthenticated: true,
      isLoading: false,
    };
  } else if (type === REGISTER_SUCCESS) {
    localStorage.setItem("token", payload.token);
    return {
      ...auth,
      token: payload.token,
      user: payload.user,
      isAuthenticated: true,
      isLoading: false,
    };
  } else if (
    type === LOAD_FAIL ||
    type === REGISTER_FAIL ||
    type === LOGIN_FAIL
  ) {
    localStorage.removeItem("token");
    return {
      ...auth,
      token: null,
      isAuthenticated: false,
      user: null,
      isLoading: false,
    };
  } else if (type === LOAD_SUCCESS) {
    return {
      ...auth,
      token: payload.token,
      isAuthenticated: true,
      user: payload.user,
      isLoading: false,
    };
  } else if (type === AVATAR_SUCCESS) {
    return {
      ...auth,
      user: payload,
    };
  }
  return auth;
};

export default auth;
