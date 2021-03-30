import {
  PROFILE_CREATED,
  PROFILE_LOADED,
  PROFILE_ERR,
  CLEAR_PROFILE,
  POSTS_LOADED,
  POSTS_ERR,
  FOLLOWED_PROFILE,
  FOLLOW_FAILED,
  PROFILE_COMMENT_ADDED,
} from "../actions/actionTypes";

const initialState = {
  data: null,
  isLoading: true,
  posts: null,
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
    console.log(payload);
    return {
      ...profile,
      data: {
        ...profile.data,
        followers: payload,
      },
    };
  } else if (type === FOLLOW_FAILED) {
    return {
      ...profile,
    };
  } else if (type === PROFILE_COMMENT_ADDED) {
    return {
      ...profile,
      posts: profile.posts.map((post) => {
        if (post._id === payload._id) {
          return {
            ...post,
            comments: payload.comments,
          };
        } else {
          return post;
        }
      }),
    };
  }

  return profile;
};

export default profileReducer;
