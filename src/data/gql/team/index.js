import { gql } from '@apollo/client';

export const GET_TEAM_INFO = gql`
  query getTeam($id: String!) {
    getTeam(id: $id) {
      name
      organization
      id
      amountRaised
      itemsSold
    }
  }
`;

export const SEND_INVITE_EMAILS = gql`
  mutation inviteUsersToTeam($emails: [String!], $teamId: String!) {
    inviteUsersToTeam(emails: $emails, teamId: $teamId)
  }
`;

export const CREATE_TEAM = gql`
  mutation createTeam($name: String!, $organization: String!) {
    createTeam(name: $name, organization: $organization, amountRaised: 0, itemsSold: 0) {
      id
    }
  }
`;

export const ADD_USER_TO_TEAM = gql`
  mutation updateUser($id: ID!, $teamId: String) {
    updateUser(id: $id, teamId: $teamId) {
      email
      firstName
      lastName
      id
      teamId
    }
  }
`;
