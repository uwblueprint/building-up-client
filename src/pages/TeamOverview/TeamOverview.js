import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';

import { Box, Heading, Text, useToast } from '@chakra-ui/react';

import { GET_USERS_FOR_TEAM, SEND_INVITE_EMAILS } from 'data/gql/team';
import { LEAVE_TEAM } from 'data/gql/user';

import InviteTeamMembers from 'components/dashboard/InviteTeamMembers/InviteTeamMembers';
import PageHeading from 'components/dashboard/PageHeading/PageHeading';
import TeamMembersTable from 'components/dashboard/TeamMembersTable/TeamMembersTable';
import Toast from 'components/dashboard/Toast/Toast';

const TeamOverview = ({ team }) => {
  const [inviteEmails, setInviteEmails] = useState(['']);
  const {
    user: { teamId },
  } = useSelector(state => state.auth);
  const toast = useToast();

  const { loading: loadingMembers, error: errorMembers, data: members, updateQuery } = useQuery(GET_USERS_FOR_TEAM, {
    variables: { teamId: team.teamId },
  });

  const [leaveTeam, { loading: loadingRemove, data: leaveTeamData }] = useMutation(LEAVE_TEAM);
  const handleRemove = id => {
    leaveTeam({ variables: { id } });
  };

  const [inviteUsersToTeam, { loading: loadingInvite, error, data }] = useMutation(SEND_INVITE_EMAILS);

  const handleSubmit = e => {
    e.preventDefault();
    inviteUsersToTeam({
      variables: { emails: inviteEmails, teamId: teamId },
    });
  };

  useEffect(() => {
    if (data) {
      toast({
        position: 'top',
        render: props => <Toast {...props} description="Email invites sent!" isClosable />,
      });
      setInviteEmails(['']);
    }
  }, [data, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error sending email invites.',
        status: 'error',
        isClosable: true,
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (leaveTeamData) {
      updateQuery(previous => {
        const ret = {};
        ret.getUsersForTeam = previous.getUsersForTeam.filter(user => {
          return user.id !== leaveTeamData.leaveTeam.id;
        });
        return ret;
      });
    }
  });

  return (
    <>
      <PageHeading teamName={team.teamName} title="Team Members" />
      <Box w="100%">
        {errorMembers ? (
          `Error! ${errorMembers.message}`
        ) : (
          <TeamMembersTable
            members={members}
            loadingMembers={loadingMembers}
            handleRemove={handleRemove}
            loadingRemove={loadingRemove}
          />
        )}
      </Box>
      <Box w="100%">
        <Heading as="h3" size="h3" mb="8px">
          Invite Team Members
        </Heading>
        <Text size="normal" mb="24px">
          Enter the emails of the people you want to add
        </Text>
        <Box w="50%">
          <InviteTeamMembers
            inputList={inviteEmails}
            setInputList={setInviteEmails}
            handleSubmit={handleSubmit}
            isEmailRequired
            withSubmitButton
            isSubmitLoading={loadingInvite}
          />
        </Box>
      </Box>
    </>
  );
};

export default TeamOverview;
