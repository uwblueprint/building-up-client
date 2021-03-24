import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, ButtonGroup, Heading, Text, useToast, VStack } from '@chakra-ui/react';
import Toast from 'components/dashboard/Toast/Toast';
import { GET_TEAM_INFO } from 'data/gql/team';
import { JOIN_TEAM } from 'data/gql/user';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

const RedirectHome = <Redirect to="/" />;

const InviteLayout = props => (
  <VStack spacing={4} align="left">
    <Box>
      <Button variant="link" onClick={() => props.triggerRedirect(true)}>
        Back to home
      </Button>
    </Box>
    <Heading>Team Invite</Heading>
    {props.children}
  </VStack>
);

function Invite(props) {
  const [loading, setLoading] = useState(false);
  const [shouldRedirect, triggerRedirect] = useState(false);
  const toast = useToast();

  const { teamId } = useParams();
  const { userId } = useSelector(state => state.auth.user);

  const [joinTeam, { _ }] = useMutation(JOIN_TEAM);

  const { loading: teamLoading, error, data } = useQuery(GET_TEAM_INFO, {
    variables: { id: teamId },
  });

  if (teamLoading) return null;
  if (error) {
    return (
      <>
        {shouldRedirect ? RedirectHome : null}
        <InviteLayout triggerRedirect={triggerRedirect}>
          <Text>Your invite link is invalid, please check again.</Text>
        </InviteLayout>
      </>
    );
  }

  const { name, organization } = data.getTeam;
  return (
    <>
      {shouldRedirect ? RedirectHome : null}
      <InviteLayout triggerRedirect={triggerRedirect}>
        <Text fontSize="lg" fontWeight="semibold">
          You have been invited to join a team: {name} - {organization}.
        </Text>
        <Text>If you join this team, you will leave your current team.</Text>
        <ButtonGroup variant="outline" size="lg" spacing={6}>
          <Button
            isLoading={loading}
            colorScheme="red"
            onClick={() => {
              triggerRedirect(true);
            }}
          >
            Decline
          </Button>
          <Button
            isLoading={loading}
            colorScheme="green"
            onClick={async () => {
              setLoading(true);
              await joinTeam({ variables: { id: userId, teamId } });
              setLoading(false);
              triggerRedirect(true);
              toast({
                position: 'top',
                render: props => (
                  <Toast {...props} description={`Successfully joined team: ${name} - ${organization}`} isClosable />
                ),
              });
            }}
          >
            Accept
          </Button>
        </ButtonGroup>
      </InviteLayout>
    </>
  );
}
export default Invite;
