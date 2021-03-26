import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, Redirect, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, ButtonGroup, Center, Heading, Link, Spinner, Text, VStack, useToast } from '@chakra-ui/react';

import Toast from 'components/dashboard/Toast/Toast';

import { UPDATE_USERS_TEAM } from 'data/actions/type';
import { GET_TEAM_INFO } from 'data/gql/team';
import { JOIN_TEAM } from 'data/gql/user';

const InviteLayout = props => (
  <VStack spacing={4} align="left">
    <Box>
      <Link color="gray.500" mb="8px" as={RouterLink} to="/">
        Back to home
      </Link>
      <Heading size="h1" as="h1">
        Team Invite
      </Heading>
    </Box>
    {props.children}
  </VStack>
);

function Invite(props) {
  const dispatch = useDispatch();
  const toast = useToast();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const { teamId } = useParams();
  const { userId } = useSelector(state => state.auth.user);

  const [joinTeam, { loading: joinTeamLoading, data: joinTeamData }] = useMutation(JOIN_TEAM);

  const { loading: teamLoading, error: teamError, data: teamData } = useQuery(GET_TEAM_INFO, {
    variables: { id: teamId },
  });

  // React to the result of the join team mutation: on joining team successfully, redirect to homepage
  useEffect(() => {
    if (joinTeamData) {
      const { teamId } = joinTeamData.joinTeam;
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
      dispatch({ type: UPDATE_USERS_TEAM, payload: teamId });
    }
  }, [joinTeamData, teamData, dispatch, toast]);

  const handleJoinTeam = () => {
    joinTeam({ variables: { id: userId, teamId } });
  };

  return teamLoading ? (
    <Center h="100%">
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
          <ButtonGroup variant="outline" size="lg" spacing={6}>
            <Button as={RouterLink} to="/" isLoading={joinTeamLoading} colorScheme="red">
              Decline
            </Button>
            <Button isLoading={joinTeamLoading} colorScheme="green" onClick={handleJoinTeam}>
              Accept
            </Button>
          </ButtonGroup>
        </>
      )}
    </InviteLayout>
  );
}
export default Invite;
