import * as actions from "../constants/userConstants";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return { loading: true };
    case actions.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case actions.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case actions.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.USER_REGISTER_REQUEST:
      return { loading: true };
    case actions.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case actions.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case actions.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const profileReducer = (state = { profileInfo: {} }, action) => {
  switch (action.type) {
    case actions.USER_DETAIL_REQUEST:
      return { ...state, loading: true };
    case actions.USER_DETAIL_SUCCESS:
      return { loading: false, profileInfo: action.payload };
    case actions.USER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case actions.USER_DETAIL_RESET:
      return { profileInfo: {} };
    default:
      return state;
  }
};

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.USER_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case actions.USER_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true, updatedUserInfo: action.payload };
    case actions.USER_PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case actions.USER_PROFILE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const updatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.USER_PASSWORD_UPDATE_REQUEST:
      return { loading: true };
    case actions.USER_PASSWORD_UPDATE_SUCCESS:
      return { loading: false, success: true, alert: action.payload };
    case actions.USER_PASSWORD_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePhotoReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.USER_PHOTO_UPDATE_REQUEST:
      return { loading: true };
    case actions.USER_PHOTO_UPDATE_SUCCESS:
      return { loading: false, success: true, alert: action.payload };
    case actions.USER_PHOTO_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
