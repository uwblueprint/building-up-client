import React from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { Box, Text, Heading, Button, Flex, HStack, VStack } from '@chakra-ui/react';

import { currentUser } from '../../../data/actions/auth';

const ConfirmTeamCreation = props => {
  const { decrementPage, teamName, teamAffiliation, userId, inputList } = props;
  const dispatch = useDispatch();
  const client = useApolloClient();

  const CREATE_TEAM = gql`
    mutation createTeam($name: String!, $organization: String!) {
      createTeam(name: $name, organization: $organization, amountRaised: 0, itemsSold: 0) {
        id
      }
    }
  `;

  const ADD_USER_TO_TEAM = gql`
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

  const [createTeam] = useMutation(CREATE_TEAM);
  const [addUser] = useMutation(ADD_USER_TO_TEAM);

  const executeQuery = () => {
    createTeam({
      variables: { name: teamName, organization: teamAffiliation },
    })
      .then(data => {
        const teamId = data.data.createTeam.id;
        addUser({
          variables: { id: userId, teamId },
        }).then(dispatch(currentUser(client)));
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Box w="100%" h="100%" alignItems="flex-start">
      <Button bg="white" onClick={decrementPage} _focus={{ boxShadow: 'white' }}>
        {'< Back'}
      </Button>
      <Heading alignSelf="flex-start" size="h1" as="h1" marginTop={2} marginBottom={8}>
        Create a Team
      </Heading>
      <HStack w="100%" h="84%" justifyContent="center" spacing={4}>
        <VStack bg="background.primary" w="90%" h="100%" borderRadius="4px" px={10} spacing={8} align="flex-start">
          <Heading as="h3" size="h3" mt={8}>
            Team Details
          </Heading>
          <Box>
            <Heading size="subtitle" as="h3" letterSpacing="wider" opacity="0.5" mb={1}>
              Team Name
            </Heading>
            <Heading as="h3" size="h3">
              {teamName}
            </Heading>
          </Box>
          <Box>
            <Heading size="subtitle" letterSpacing="wider" opacity="0.5" mb={1}>
              Team Affiliation
            </Heading>
            <Heading as="h3" size="h3">
              {teamAffiliation === '' ? 'N/A' : teamAffiliation}
            </Heading>
          </Box>
        </VStack>
        <VStack bg="background.primary" w="90%" h="100%" borderRadius="4px" px={10} spacing={8} align="flex-start">
          <Heading as="h3" size="h3" mt={8}>
            Invite Team Members (optional)
          </Heading>
          {inputList.length === 1 && inputList[0] === '' ? (
            <Text fontSize="xl">No team members invited.</Text>
          ) : (
            inputList.map((x, i) => {
              return (
                <Text key={i} fontSize="xl" fontWeight="normal">
                  {x}
                </Text>
              );
            })
          )}
        </VStack>
      </HStack>
      <Flex marginTop={4} justify="space-between">
        <Button size="lg" _focus={{ boxShadow: 'white' }} onClick={decrementPage}>
          Previous
        </Button>
        <Button size="lg" _focus={{ boxShadow: 'white' }} onClick={executeQuery}>
          Confirm
        </Button>
      </Flex>
    </Box>
  );
};

export default ConfirmTeamCreation;
