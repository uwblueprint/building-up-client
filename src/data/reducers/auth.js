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
  let firstName, lastName, email, userId, teamId;

  switch (type) {
    case REGISTER_SUCCESS:
      ({ firstName, lastName, email, userId, teamId } = payload);
      return {
        ...state,
        // TODO: email, userId, firstName, lastName, should be set here
        user: {
          payload,
          lastName,
          email,
          userId,
          teamId,
        },
      };
    case REGISTER_FAIL:
      return {
        ...state,
        user: null,
      };
    case LOGIN_SUCCESS:
      ({ firstName, lastName, email, userId, teamId } = payload);
      return {
        ...state,
        authenticating: false,
        user: {
          firstName,
          lastName,
          email,
          userId,
          teamId,
        },
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
