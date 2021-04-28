import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, Redirect, useParams } from 'react-router-dom';
import { Box, Button, ButtonGroup, Center, Heading, Spinner, Text, VStack, useToast } from '@chakra-ui/react';

import { useInvite } from 'hooks/use-invite';

import Toast from 'components/dashboard/Toast/Toast';

const InviteLayout = props => (
  <VStack spacing={4} align="left">
    <Box>
      <Heading size="h1" as="h1">
        Team Invite
      </Heading>
    </Box>
    {props.children}
  </VStack>
);

/**
 * This page renders only if the user follows an invite link and they are already signed in (have a cookie)
 * Otherwise, the user will see invite context on the login page,
 * and will automatically join the team after signing in — skipping this page entirely
 */
function Invite() {
  const dispatch = useDispatch();
  const toast = useToast();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const { teamId } = useParams();
  const { userId } = useSelector(state => state.auth.user);

  const { joinTeamMutation, getTeamInfoQuery } = useInvite(teamId);

  const [joinTeam, { loading: joinTeamLoading, data: joinTeamData }] = joinTeamMutation;
  const { loading: teamLoading, error: teamError, data: teamData } = getTeamInfoQuery;

  // React to the result of the join team mutation: on joining team successfully, redirect to homepage
  useEffect(() => {
    if (joinTeamData) {
      const { name, organization } = teamData.getTeam;

      setShouldRedirect(true);
      toast({
        position: 'top',
        render: props => (
          <Toast
            {...props}
            description={`Successfully joined team: ${name}${organization ? ' - ' : ''}${organization}`}
            isClosable
          />
        ),
      });
    }
  }, [joinTeamData, teamData, dispatch, toast]);

  const handleJoinTeam = () => {
    joinTeam({ variables: { id: userId, teamId } });
  };

  return teamLoading ? (
    <Center h="100%" w="100%">
      <Spinner size="xl" />
    </Center>
  ) : shouldRedirect ? (
    <Redirect to="/" />
  ) : (
    <InviteLayout>
      {teamError ? (
        <Text>Your invite link is invalid, please check again.</Text>
      ) : (
        <>
          <Text fontSize="lg" fontWeight="semibold">
            You have been invited to join a team: {teamData.getTeam.name}
            {`${teamData.getTeam.organization ? ' - ' : ''}`}
            {teamData.getTeam.organization}
          </Text>
          <Text>If you join this team, you will leave your current team.</Text>
          <ButtonGroup size="lg" spacing={2}>
            <Button isLoading={joinTeamLoading} variant="black" onClick={handleJoinTeam}>
              Accept
            </Button>
            <Button
              as={RouterLink}
              to="/"
              isLoading={joinTeamLoading}
              variant="outline"
              colorScheme="gray"
              borderColor="black"
            >
              Decline
            </Button>
          </ButtonGroup>
        </>
      )}
    </InviteLayout>
  );
}
export default Invite;
