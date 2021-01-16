import {
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  SEARCH_DEFAULT,
} from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  users: null,
};

const search = (search = initialState, action) => {
  const { type, payload } = action;
  if (type === SEARCH_SUCCESS) {
    return {
      ...search,
      isLoading: false,
      users: payload,
    };
  } else if (type === SEARCH_FAIL) {
    return {
      ...search,
      isLoading: false,
      users: null,
    };
  } else if (type === SEARCH_DEFAULT) {
    return {
      ...search,
      isLoading: true,
      users: null,
    };
  }
  return search;
};

export default search;
