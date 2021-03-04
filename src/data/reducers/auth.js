import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from '../actions/type';

const initialState = {
  authenticating: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: payload
      };
    case REGISTER_FAIL:
      return {
        ...state,
        user: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticating: false,
        user: payload
      };
    case LOGIN_FAIL:
      return {
        ...state,
        authenticating: false,
        user: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authenticating: false,
        user: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        authenticating: false,
        user: null,
      };
    default:
      return state;
  }
}
