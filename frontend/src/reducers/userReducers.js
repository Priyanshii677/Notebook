import {
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
} from "../constants/userConstants.js";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loader: true };
    case USER_LOGIN_SUCCESS:
      return { loader: true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loader: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
