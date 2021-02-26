import * as actions from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actions.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/auth/login",
      { email, password },
      config
    );

    dispatch({
      type: actions.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: actions.USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: actions.USER_LOGOUT,
  });
  dispatch({
    type: actions.USER_DETAIL_RESET,
  });

  localStorage.removeItem("userInfo");
};

export const register = (firstName, lastName, email, password) => async (
  dispatch
) => {
  try {
    dispatch({
      type: actions.USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/auth/register",
      { firstName, lastName, email, password },
      config
    );

    dispatch({
      type: actions.USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: actions.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: actions.USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getProfile = (link) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.USER_DETAIL_REQUEST });

    const {
      loginUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/auth/${link}`, config);

    dispatch({
      type: actions.USER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: actions.USER_DETAIL_FAIL,
      payload: message,
    });
  }
};

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.USER_PROFILE_UPDATE_REQUEST });

    const {
      loginUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put("/api/v1/auth/profile", user, config);

    dispatch({
      type: actions.USER_PROFILE_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: actions.USER_LOGIN_SUCCESS,
      payload: data,
    });

    dispatch({ type: actions.USER_DETAIL_RESET });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: actions.USER_PROFILE_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const changePassword = (password, newPassword) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: actions.USER_PASSWORD_UPDATE_REQUEST });

    const {
      loginUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/v1/auth/${userInfo.data._id}/password`,
      { password, newPassword },
      config
    );

    dispatch({
      type: actions.USER_PASSWORD_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({ type: actions.USER_DETAIL_RESET });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: actions.USER_PASSWORD_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const uploadPhoto = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.USER_PHOTO_UPDATE_REQUEST });

    const {
      loginUser: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/v1/auth/${userInfo.data._id}/photo`,
      formData,
      config
    );

    dispatch({
      type: actions.USER_PHOTO_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: actions.USER_DETAIL_RESET,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: actions.USER_PHOTO_UPDATE_FAIL,
      payload: message,
    });
  }
};
