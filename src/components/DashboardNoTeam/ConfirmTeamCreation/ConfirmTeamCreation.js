import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Box, Text, Heading, Button, HStack, VStack } from '@chakra-ui/react';

const ConfirmTeamCreation = props => {
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
        id
      }
    }
  `;

  const [createTeam] = useMutation(CREATE_TEAM);
  const [addUser] = useMutation(ADD_USER_TO_TEAM);

  const executeQuery = () => {
    createTeam({
      variables: { name: props.teamName, organization: props.teamAffiliation },
    })
      .then(data => {
        let teamId = data.data.createTeam.id;
        addUser({
          variables: { id: props.userId, teamId: teamId },
        }).then(window.location.reload());
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Box w="full" h="100%" alignItems="flex-start">
      <Button bg="white" onClick={props.decrementPage} _focus={{ boxShadow: '#FFFFFF' }}>
        &lt; Back
      </Button>
      <Heading alignSelf="flex-start" size="h1" as="h1" marginTop={2} marginBottom={8}>
        Create a Team
      </Heading>
      <Box as="form" w="full" h="84%" onSubmit={props.incrementPage}>
        <HStack h="full" justifyContent="center" display="flex" flexDirection="row" spacing={4}>
          <Box bg="background.primary" alignItems="flex-start" marginRight={4} w="90%" h="100%" borderRadius="4px">
            <Box marginRight={10} marginLeft={10} h="100%" fontWeight="600">
              <Text fontSize="2xl" marginTop={8} marginBottom={8}>
                Team Details
              </Text>
              <Text fontSize="xl" fontWeight="semibold" marginBottom={1} letterSpacing="wider" opacity="0.5">
                TEAM NAME
              </Text>
              <Text fontSize="3xl" marginBottom={8}>
                {props.teamName}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" marginBottom={1} letterSpacing="wider" opacity="0.5">
                TEAM AFFILIATIONS
              </Text>
              <Text fontSize="3xl" marginBottom={8}>
                {props.teamAffiliation === '' ? 'N/A' : props.teamAffiliation}
              </Text>
            </Box>
          </Box>
          <Box bg="background.primary" fontWeight="600" alignItems="flex-start" w="90%" h="100%" borderRadius="4px">
            <VStack marginRight={10} marginLeft={10} h="100%" alignItems="flex-start">
              <Text fontSize="2xl" fontWeight="semibold" marginTop={8} marginBottom={8}>
                Invite Team Members (optional)
              </Text>
              {props.inputList[0]['email'] === '' ? (
                <Text fontSize="3xl"> N/A </Text>
              ) : (
                props.inputList.map((x, i) => {
                  return (
                    <Text key={x.email} fontSize="xl" fontWeight="normal">
                      {x.email}
                    </Text>
                  );
                })
              )}
            </VStack>
          </Box>
        </HStack>
        <Box display="flex" flexDirection="row" justifyContent="flex-end" marginTop={4}>
          <Button _focus={{ boxShadow: '#FFFFFF' }} onClick={executeQuery} type="submit" justifySelf="flex-end">
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmTeamCreation;
