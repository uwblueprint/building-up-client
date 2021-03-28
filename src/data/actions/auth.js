import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAIL,
} from './type';

import AuthService from '../services/auth.service';

export const register = (firstName, lastName, email, password, client) => dispatch => {
  return AuthService.register(firstName, lastName, email, password, client).then(
    res => {
      const { firstName, lastName, email, id, teamId } = res.data.register;
      console.log(res);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          firstName,
          lastName,
          email,
          userId: id,
          teamId,
        },
      });
      return Promise.resolve(true);
    },
    error => {
      console.log(error);
      dispatch({
        type: REGISTER_FAIL,
      });
      return Promise.reject(error);
    },
  );
};

export const login = (email, password, client) => dispatch => {
  return AuthService.login(email, password, client).then(
    res => {
      //login successful
      if (res.data.login !== null) {
        const { firstName, lastName, email, id, teamId } = res.data.login;
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            firstName,
            lastName,
            email,
            userId: id,
            teamId,
          },
        });
        return Promise.resolve(true);
        //login failed
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });
        return Promise.resolve(false);
      }
    },
    error => {
      console.log(error);
      dispatch({
        type: LOGIN_FAIL,
      });
      return Promise.reject(error);
    },
  );
};

export const logout = client => dispatch => {
  return AuthService.logout(client).then(
    res => {
      if (res !== null) {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      } else {
        dispatch({
          type: LOGOUT_FAIL,
        });
      }
      return Promise.resolve();
    },
    error => {
      console.error(error);
      dispatch({
        type: LOGOUT_FAIL,
      });
      return Promise.reject();
    },
  );
};

export const currentUser = client => dispatch => {
  return AuthService.getCurrentUser(client).then(
    res => {
      if (res.data.getActiveUser !== null) {
        const { firstName, lastName, email, id, teamId } = res.data.getActiveUser;
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            firstName,
            lastName,
            email,
            userId: id,
            teamId,
          },
        });
        return Promise.resolve(teamId);
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });
        return Promise.resolve();
      }
    },
    error => {
      console.error(error);
      dispatch({
        type: LOGIN_FAIL,
      });
      return Promise.reject();
    },
  );
};

export const teamInfo = (teamId, client) => dispatch => {
  return AuthService.getTeamInfo(teamId, client).then(
    res => {
      //query successful
      if (res.data.getTeam !== null) {
        const { name, organization, id, itemsSold, amountRaised } = res.data.getTeam;
        dispatch({
          type: GET_TEAM_SUCCESS,
          payload: {
            teamName: name,
            affiliation: organization,
            teamId: id,
            itemsSold,
            amountRaised,
          },
        });
        return Promise.resolve(res.data.getTeam);
      } else {
        //query failed
        dispatch({
          type: GET_TEAM_FAIL,
        });
        return Promise.resolve();
      }
    },
    error => {
      console.error(error);
      dispatch({
        type: GET_TEAM_FAIL,
      });
      return Promise.reject(error);
    },
  );
};

export const noTeamInfo = (teamId, client) => dispatch => {
  dispatch({
    type: GET_TEAM_FAIL,
  });
}