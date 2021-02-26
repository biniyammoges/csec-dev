import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  loginReducer,
  profileReducer,
  registerReducer,
  updatePasswordReducer,
  updateProfileReducer,
  updatePhotoReducer,
} from "./reducers/userReducers";
import { eventsReducer } from "./reducers/eventsReducer";

const middleware = [thunk];

const reducer = combineReducers({
  loginUser: loginReducer,
  registerUser: registerReducer,
  userProfile: profileReducer,
  updateUser: updateProfileReducer,
  updatePassword: updatePasswordReducer,
  updatePhoto: updatePhotoReducer,
  allEvents: eventsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loginUser: {
    userInfo: userInfoFromStorage,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
