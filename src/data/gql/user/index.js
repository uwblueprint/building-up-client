import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $role: String
  ) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email, password: $password, role: $role) {
      email
      firstName
      lastName
      id
    }
  }
`;

export const JOIN_TEAM = gql`
  mutation joinTeam($id: ID!, $teamId: String!) {
    joinTeam(id: $id, teamId: $teamId) {
      id
      teamId
    }
  }
`;

export const LEAVE_TEAM = gql`
  mutation leaveTeam($id: ID!) {
    leaveTeam(id: $id) {
      id
    }
  }
`;
