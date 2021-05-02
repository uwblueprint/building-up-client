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
  mutation leaveTeam($id: ID!, $sendNotifEmail: Boolean!) {
    leaveTeam(id: $id, sendNotifEmail: $sendNotifEmail) {
      id
    }
  }
`;

export const VERIFY_ACCOUNT = gql`
  mutation verifyAccount($id: ID!, $hash: String!) {
    verifyAccount(id: $id, hash: $hash) {
      isVerified
    }
  }
`;

export const SEND_VERIFICATION_EMAIL = gql`
  mutation sendVerificationEmail($id: ID!) {
    sendVerificationEmail(id: $id)
  }
`;

export const SEND_PASSWORD_RESET = gql`
  query sendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($jwtToken: String!, $password: String!) {
    resetPassword(jwtToken: $jwtToken, password: $password)
  }
`;
