import React from 'react';
import { Box, Text, Button, Input, Heading, HStack, VStack, Flex, FormControl } from '@chakra-ui/react';

import InviteTeamMembers from 'components/dashboard/InviteTeamMembers/InviteTeamMembers';

const CreateTeamForm = props => {
  const {
    incrementPage,
    decrementPage,
    teamName,
    teamAffiliation,
    setTeamName,
    setTeamAffiliation,
    inputList,
    setInputList,
  } = props;

  const onChangeTeamName = e => {
    setTeamName(e.target.value);
  };

  const onChangeTeamAffiliation = e => {
    setTeamAffiliation(e.target.value);
  };

  return (
    <Box w="100%" h="100%" alignItems="flex-start">
      <Button color="black" onClick={decrementPage} _focus={{ boxShadow: 'white' }} variant="link">
        {'< Back'}
      </Button>
      <Heading alignSelf="flex-start" size="h1" as="h1" marginTop={2} marginBottom={8}>
        Create a Team
      </Heading>
      <Box as="form" w="100%" h="84%" onSubmit={incrementPage}>
        <HStack h="100%" justifyContent="center" spacing={4}>
          <VStack bg="background.primary" w="90%" h="100%" borderRadius="4px" px={10} spacing={6} align="flex-start">
            <Heading as="h3" size="h3" marginTop={8}>
              Team Details
            </Heading>
            <FormControl id="teamCreation" isRequired>
              <Input bg="white" placeholder="Team Name" value={teamName} onChange={onChangeTeamName} />
            </FormControl>
            <Input
              bg="white"
              placeholder="Team Affiliation (Optional)"
              value={teamAffiliation}
              onChange={onChangeTeamAffiliation}
            />
          </VStack>
          <VStack bg="background.primary" w="90%" h="100%" borderRadius="4px" px={10} spacing={7} align="flex-start">
            <Heading as="h3" size="h3" marginTop={8}>
              Invite Team Members (optional)
            </Heading>
            <Text fontSize="xl" fontWeight="normal">
              Enter the emails of the people you want to add
            </Text>
            <InviteTeamMembers inputList={inputList} setInputList={setInputList} />
          </VStack>
        </HStack>
        <Flex justify="flex-end" marginTop={4}>
          <Button size="lg" _focus={{ boxShadow: 'white' }} type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CreateTeamForm;
