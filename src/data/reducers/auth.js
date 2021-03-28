import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAIL,
  UPDATE_USER,
} from '../actions/type';

const initialState = {
  authenticating: true,
  user: null,
  team: {
    loading: true,
    data: null,
  },
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
        team: {
          loading: false,
          data: null,
        },
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authenticating: false,
        user: null,
        team: {
          loading: false,
          data: null,
        },
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        authenticating: false,
        user: null,
        team: {
          loading: false,
          data: null,
        },
      };
    case GET_TEAM_SUCCESS:
      return {
        ...state,
        team: { loading: false, data: payload },
      };
    case GET_TEAM_FAIL:
      return {
        ...state,
        team: {
          loading: false,
          data: null,
        },
      };
    case UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...payload },
      };
    default:
      return state;
  }
};

export default authReducer;
