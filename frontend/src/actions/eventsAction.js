import * as actions from "../constants/eventsConstant";
import axios from "axios";

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: actions.EVENTS_REQUEST,
    });

    const { data } = await axios.get("/api/v1/events");

    dispatch({
      type: actions.EVENTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: actions.EVENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
