import { POST_CREATED } from "../actions/actionTypes";

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
  }
  return post;
};

export default postReducer;
