import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_USER,
  UPDATE_USERS_TEAM,
} from '../actions/type';

const initialState = {
  authenticating: true,
  user: null,
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
    case UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...payload },
      };
    case UPDATE_USERS_TEAM:
      return {
        ...state,
        user: {
          ...state.user,
          teamId: payload,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
