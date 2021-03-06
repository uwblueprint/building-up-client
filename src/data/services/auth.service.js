import { gql } from '@apollo/client';
import { GET_TEAM_INFO } from 'data/gql/team';

const REGISTER_MUTATION = gql`
  mutation createNewUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    register(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      firstName
      lastName
      email
      id
      isVerified
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      firstName
      lastName
      email
      id
      teamId
      isVerified
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;

const CURRENT_USER = gql`
  query getCurrentUser {
    getActiveUser {
      email
      firstName
      lastName
      id
      teamId
      isVerified
    }
  }
`;

const register = (firstName, lastName, email, password, client) => {
  const res = client.mutate({
    variables: { firstName: firstName, lastName: lastName, email: email, password: password },
    mutation: REGISTER_MUTATION,
  });
  return res;
};

const login = (email, password, client) => {
  const res = client.mutate({
    variables: { email: email, password: password },
    mutation: LOGIN_MUTATION,
  });
  console.log(res);
  return res;
};

const logout = client => {
  const res = client.mutate({
    mutation: LOGOUT_MUTATION,
  });
  console.log(res);
  return res;
};

const getCurrentUser = client => {
  const res = client.query({
    query: CURRENT_USER,
    fetchPolicy: 'no-cache',
  });
  return res;
};

const getTeamInfo = (teamId, client) => {
  const res = client.query({
    variables: { id: teamId },
    query: GET_TEAM_INFO,
  });
  return res;
};

const exports = {
  register,
  login,
  logout,
  getCurrentUser,
  getTeamInfo,
};

export default exports;
