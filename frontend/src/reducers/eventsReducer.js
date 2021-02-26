import * as actions from "../constants/eventsConstant";

export const eventsReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case actions.EVENTS_REQUEST:
      return { ...state, loading: true };
    case actions.EVENTS_SUCCESS:
      return { loading: false, events: action.payload };
    case actions.EVENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
