import {
  PROFILE_CREATED,
  PROFILE_LOADED,
  PROFILE_ERR,
  CLEAR_PROFILE,
  POSTS_LOADED,
  POSTS_ERR,
  FOLLOWED_PROFILE,
  FOLLOW_FAILED,
} from "../actions/actionTypes";

const initialState = {
  data: null,
  isLoading: true,
  posts: null,
  isFollowed: null,
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
      posts: null,
    };
  } else if (type === CLEAR_PROFILE) {
    return {
      data: null,
      isLoading: true,
      posts: null,
    };
  } else if (type === POSTS_LOADED) {
    return {
      ...profile,
      posts: payload,
    };
  } else if (type === POSTS_ERR) {
    return {
      ...profile,
      posts: null,
    };
  } else if (type === FOLLOWED_PROFILE) {
    return {
      ...profile,
      isFollowed: true,
    };
  } else if (type === FOLLOW_FAILED) {
    return {
      ...profile,
      isFollowed: false,
    };
  }

  return profile;
};

export default profileReducer;
