import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS
  } from "../actions/type";
import Cookies from 'js-cookie';

//TODO: figure out a way to get user details into the state, this only checks if cookie is there and makes
// isLoggedIn true, but we should userId, email etc..
const user = Cookies.get('access-token');

const initialState = user
  ? { isLoggedIn: true, firstName:null, lastName:null, email:null, id:null }
  : { isLoggedIn: false, firstName: null, lastName: null, email: null, id: null};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        firstName: payload.firstName,
        lastName: payload.lastName, 
        email: payload.email,
        id: payload.id,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        firstName: null,
        lastName: null, 
        email: null,
        id: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        firstName: null,
        lastName: null, 
        email: null,
        id: null,
    };
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        firstName: null,
        lastName: null, 
        email: null,
        id: null,
    };
    default:
      return state;
  }
}