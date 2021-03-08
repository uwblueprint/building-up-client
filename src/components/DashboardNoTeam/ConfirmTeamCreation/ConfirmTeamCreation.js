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
      <Box w="100%" h="84%">
        <HStack h="100%" justifyContent="center" display="flex" flexDirection="row" spacing={4}>
          <Box bg="background.primary" alignItems="flex-start" marginRight={4} w="90%" h="100%" borderRadius="4px">
            <Box marginRight={10} marginLeft={10} h="100%" fontWeight="600">
              <Heading as="h3" size="h3" marginTop={8} marginBottom={8}>
                Team Details
              </Heading>
              <Text fontSize="xl" fontWeight="semibold" marginBottom={1} letterSpacing="wider" opacity="0.5">
                TEAM NAME
              </Text>
              <Heading as="h3" size="h3" marginBottom={8}>
                {teamName}
              </Heading>
              <Text fontSize="xl" fontWeight="semibold" marginBottom={1} letterSpacing="wider" opacity="0.5">
                TEAM AFFILIATIONS
              </Text>
              <Heading as="h3" size="h3" marginBottom={8}>
                {teamAffiliation === '' ? 'N/A' : teamAffiliation}
              </Heading>
            </Box>
          </Box>
          <Box bg="background.primary" fontWeight="600" alignItems="flex-start" w="90%" h="100%" borderRadius="4px">
            <VStack marginRight={10} marginLeft={10} h="100%" alignItems="flex-start">
              <Heading as="h3" size="h3" marginTop={8} marginBottom={8}>
                Invite Team Members (optional)
              </Heading>
              {(inputList.length === 1) & (inputList[0] === '') ? (
                <Text fontSize="3xl"> N/A </Text>
              ) : (
                inputList.map((x, i) => {
                  if (!x?.trim()) {
                    return null;
                  } else {
                    return (
                      <Text key={i} fontSize="xl" fontWeight="normal">
                        {x}
                      </Text>
                    );
                  }
                })
              )}
            </VStack>
          </Box>
        </HStack>
        <Flex flexDirection="row" marginTop={4} justifyContent="space-between">
          <Button _focus={{ boxShadow: 'white' }} onClick={decrementPage}>
            Previous
          </Button>
          <Button _focus={{ boxShadow: 'white' }} onClick={executeQuery}>
            Confirm
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default ConfirmTeamCreation;
