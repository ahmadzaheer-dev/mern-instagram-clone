import {
  PROFILE_CREATED,
  PROFILE_LOADED,
  PROFILE_ERR,
  CLEAR_PROFILE,
} from "../actions/actionTypes";

const initialState = {
  data: null,
  isLoading: true,
};

const profileReducer = (profile = initialState, action) => {
  const { type, payload } = action;
  if (type === PROFILE_CREATED || type === PROFILE_LOADED) {
    return {
      ...profile,
      data: payload,
      isLoading: false,
    };
  } else if (type === PROFILE_ERR) {
    return {
      ...profile,
      data: null,
      isLoading: false,
    };
  } else if (type === CLEAR_PROFILE) {
    return {
      data: null,
      isLoading: true,
    };
  }

  return profile;
};

export default profileReducer;
