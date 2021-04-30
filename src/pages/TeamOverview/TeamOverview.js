import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

import { Box, HStack, Button, Heading, Text, useToast } from '@chakra-ui/react';

import { GET_USERS_FOR_TEAM, SEND_INVITE_EMAILS } from 'data/gql/team';
import { LEAVE_TEAM } from 'data/gql/user';
import { UPDATE_USER } from 'data/actions/type';

import InviteTeamMembers from 'components/dashboard/InviteTeamMembers/InviteTeamMembers';
import PageHeading from 'components/dashboard/PageHeading/PageHeading';
import TeamMembersTable from 'components/dashboard/TeamMembersTable/TeamMembersTable';
import TeamEditInfo from 'components/dashboard/TeamMembersTable/TeamEditInfo';
import Toast from 'components/dashboard/Toast/Toast';

const TeamOverview = ({ team }) => {
  const dispatch = useDispatch();
  const [inviteEmails, setInviteEmails] = useState(['']);
  const [onEditPage, setOnEditPage] = useState(false);

  const {
    user: { userId, teamId },
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
      if (leaveTeamData.leaveTeam.id === userId) {
        dispatch({ type: UPDATE_USER, payload: { teamId: null } });
        toast({
          position: 'top',
          render: props => <Toast {...props} description="You have successfully left your team." isClosable />,
        });
      } else {
        updateQuery(previous => {
          const ret = {};
          ret.getUsersForTeam = previous.getUsersForTeam.filter(user => {
            return user.id !== leaveTeamData.leaveTeam.id;
          });
          return ret;
        });
        toast({
          position: 'top',
          render: props => <Toast {...props} description="Removed user from team" isClosable />,
        });
      }
    }
  }, [dispatch, userId, leaveTeamData, updateQuery, toast]);

  return (
    <>
      {onEditPage ? (
        <TeamEditInfo
          teamId={team.teamId}
          teamName={team.teamName}
          teamOrg={team.affiliation}
          setOnEditPage={setOnEditPage}
        />
      ) : (
        <>
          <HStack justifyContent="space-between" w="100%">
            <PageHeading teamName={team.teamName} title="Team Members" />
            <Button justifySelf="flex-end" alignSelf="flex-end" variant="black" onClick={() => setOnEditPage(true)}>
              Edit Team Details
            </Button>
          </HStack>
          <Box w="100%">
            {errorMembers ? (
              `Error! ${errorMembers.message}`
            ) : (
              <TeamMembersTable
                members={members}
                teamName={team.teamName}
                loadingMembers={loadingMembers}
                handleRemove={handleRemove}
                loadingRemove={loadingRemove}
                removeData={leaveTeamData}
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
      )}
    </>
  );
};

export default TeamOverview;
