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

export const GET_USERS_FOR_TEAM = gql`
  query getUsersForTeam($teamId: String!) {
    getUsersForTeam(teamId: $teamId) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const GET_GLOBAL_LEADERBOARD = gql`
  query getGlobalLeaderboard {
    getGlobalLeaderboard {
      id
      name
      organization
      itemsSold
      amountRaised
    }
  }
`;
