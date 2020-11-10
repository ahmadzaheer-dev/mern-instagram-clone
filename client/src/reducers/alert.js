import {
  REMOVE_FEEDBACK_ALERT,
  SET_FEEDBACK_ALERT,
} from "../actions/actionTypes";

const initialState = [];

const alerts = (alerts = initialState, action) => {
  const { type, payload } = action;

  if (type === SET_FEEDBACK_ALERT) {
    return [
      ...alerts,
      { id: payload.id, alertType: payload.alertType, msg: payload.msg },
    ];
  } else if (type === REMOVE_FEEDBACK_ALERT) {
    return [...alerts.filter((cur) => cur.id !== payload.id)];
  }
  return alerts;
};

export default alerts;
