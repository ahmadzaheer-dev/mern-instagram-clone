import { v4 as uuid } from "uuid";
import { REMOVE_FEEDBACK_ALERT, SET_FEEDBACK_ALERT } from "./actionTypes";

export const setAlert = (msg, alertType) => async (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_FEEDBACK_ALERT,
    payload: {
      id,
      msg,
      alertType,
    },
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_FEEDBACK_ALERT,
      payload: {
        id,
      },
    });
  }, 5000);
};
