import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAIL,
} from '../actions/type';

const initialState = {
  authenticating: true,
  user: null,
  team: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: payload,
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
        user: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        authenticating: false,
        user: null,
        team: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authenticating: false,
        user: null,
        team: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        authenticating: false,
        user: null,
        team: null,
      };
    case GET_TEAM_SUCCESS:
      return {
        ...state,
        team: payload,
      };
    case GET_TEAM_FAIL:
      return {
        ...state,
        team: null,
      };
    default:
      return state;
  }
};

export default authReducer;
