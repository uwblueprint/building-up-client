import React from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Box, Text, Heading, Button, Flex, HStack, VStack, useToast } from '@chakra-ui/react';
import Toast from 'components/dashboard/Toast/Toast';

import { CREATE_TEAM, SEND_INVITE_EMAILS } from 'data/gql/team';
import { JOIN_TEAM } from 'data/gql/user';
import { UPDATE_USER } from 'data/actions/type';

const ConfirmTeamCreation = props => {
  const { decrementPage, teamName, teamAffiliation, userId, inputList } = props;
  const dispatch = useDispatch();
  const toast = useToast();

  const [createTeam] = useMutation(CREATE_TEAM);
  const [joinTeam] = useMutation(JOIN_TEAM);
  const [inviteUsersToTeam] = useMutation(SEND_INVITE_EMAILS);

  const executeQuery = () => {
    createTeam({ variables: { name: teamName, organization: teamAffiliation } })
      .then(data => {
        const teamId = data.data.createTeam.id;
        const list = [...inputList];

        joinTeam({ variables: { id: userId, teamId } }).then(() => {
          dispatch({ type: UPDATE_USER, payload: { teamId } });

          toast({
            position: 'top',
            render: props => <Toast {...props} description="Your team has been created." isClosable />,
          });

          inviteUsersToTeam({
            variables: { emails: list, teamId: teamId },
          })
            .then(data => {
              console.log(data);
              // Create a toast or alert to indicate emails have been sent
            })
            .catch(e => {
              console.log(e);
            });
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Box w="100%" h="100%" alignItems="flex-start">
      <Button color="black" onClick={decrementPage} _focus={{ boxShadow: 'white' }} variant="link">
        {'< Back'}
      </Button>
      <Heading alignSelf="flex-start" size="h1" as="h1" marginTop={2} marginBottom={8}>
        Create a Team
      </Heading>
      <HStack w="100%" h="84%" justifyContent="center" spacing={4}>
        <VStack bg="background.primary" w="90%" h="100%" borderRadius="4px" px={10} spacing={8} align="flex-start">
          <Flex direction="row" justify="space-between" w="100%" mt={8}>
            <Heading as="h3" size="h3">
              Team Details
            </Heading>
            <Button variant="link" color="brand.error" onClick={decrementPage}>
              Edit
            </Button>
          </Flex>
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
      <Flex marginTop={4} justify="flex-end">
        <Button size="lg" _focus={{ boxShadow: 'white' }} onClick={executeQuery}>
          Confirm
        </Button>
      </Flex>
    </Box>
  );
};

export default ConfirmTeamCreation;
