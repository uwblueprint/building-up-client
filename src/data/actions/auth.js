import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
} from "./type";

import AuthService from "../services/auth.service";

export const register = (firstName, lastName, email, password, client) => (dispatch) => {
  return AuthService.register(firstName, lastName, email, password, client).then(
    (response) => {
      console.log(response);
      dispatch({
        type: REGISTER_SUCCESS,
      });  
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      dispatch({
        type: REGISTER_FAIL,
      });
      return Promise.reject();
    }
  );
};

export const login = (email, password, client) => (dispatch) => {
  return AuthService.login(email, password, client).then(
    (res) => {
      //login successful
      if (res.data.login !== null){
        const { firstName, lastName, email, id, teamId } = res.data.login
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { 
            firstName: firstName,
            lastName: lastName,
            email: email,
            userId: id,
            teamId: teamId,
          },
        });
      //login failed
      }else{
        dispatch({
          type: LOGIN_FAIL,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      dispatch({
        type: LOGIN_FAIL,
      });
      return Promise.reject();
    }
  );
};

export const logout = (client) => (dispatch) => {
  return AuthService.logout(client).then(
    (res) => {
      if (res !== null){ 
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      }else{
        dispatch({
          type: LOGOUT_FAIL,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      console.error(error);
      dispatch({
        type: LOGOUT_FAIL,
      });
      return Promise.reject();
    }
  );
};

export const currentUser = (client) => (dispatch) => {
  return AuthService.getCurrentUser(client).then(
    (res) => {
      //login successful
      if (res.data.getActiveUser !== null){
        const { firstName, lastName, email, id, teamId } = res.data.getActiveUser
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { 
            firstName: firstName,
            lastName: lastName,
            email: email,
            userId: id,
            teamId: teamId,
          },
        });
      //login failed
      }else{
        dispatch({
          type: LOGIN_FAIL,
        });
      }
      return Promise.resolve();
    },
    (error) => { 
      console.error(error);
      dispatch({
        type: LOGIN_FAIL,
      });
      return Promise.reject();
    }
  );
};
