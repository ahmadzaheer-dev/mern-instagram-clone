import { POST_CREATED, POST_CHANGED } from "../actions/actionTypes";

const initialState = {
  data: null,
  isLoading: true,
};

const postReducer = (post = initialState, action) => {
  const { type, payload } = action;
  if (type === POST_CREATED) {
    return {
      ...post,
      data: payload,
      isLoading: false,
    };
  } else if (type === POST_CHANGED) {
    return {
      ...post,
      data: payload,
      isLoading: false,
    };
  }
  return post;
};

export default postReducer;
