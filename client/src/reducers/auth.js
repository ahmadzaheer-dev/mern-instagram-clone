import { LOGIN_SUCCESS, REGISTER_SUCCESS } from "../actions/actionTypes";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
};

const auth = (auth = initialState, action) => {
  const { type, payload } = action;
  if (type === LOGIN_SUCCESS) {
    return {
      ...auth,
      token: payload.token,
      user: payload.user,
      isAuthenticated: true,
    };
  } else if (type === REGISTER_SUCCESS) {
    return {
      ...auth,
      token: payload.token,
      user: payload.user,
      isAuthenticated: true,
    };
  }
  return auth;
};

export default auth;
