import React from 'react';
import { Box, Text, Button, Input, Heading, HStack, VStack, FormControl } from '@chakra-ui/react';

const InviteTeamMembers = props => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...props.inputList];
    list[index][name] = value;
    props.setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...props.inputList];
    list.splice(index, 1);
    props.setInputList(list);
  };

  const handleAddClick = () => {
    props.setInputList([...props.inputList, { email: '' }]);
  };

  return (
    <Box w="100%">
      {props.inputList.map((x, i) => {
        return (
          <Box d="flex" mb="8px" key="{x}">
            <FormControl w="100%">
              <Input
                bg="white"
                type="email"
                name="email"
                placeholder="Email"
                value={x.email}
                onChange={e => handleInputChange(e, i)}
              />
            </FormControl>
            {props.inputList.length !== 1 ? (
              <Button variant="ghost" onClick={() => handleRemoveClick(i)} maxW="15%">
                {' '}
                x{' '}
              </Button>
            ) : null}
          </Box>
        );
      })}
      <Button variant="link" mb="40px" fontSize="16px" onClick={handleAddClick} display="block">
        + Add Another
      </Button>
    </Box>
  );
};

const CreateTeamForm = props => {
  const onChangeTeamName = e => {
    props.setTeamName(e.target.value);
  };

  const onChangeTeamAffiliation = e => {
    props.setTeamAffiliation(e.target.value);
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
            <VStack marginRight={10} marginLeft={10} spacing={7} align="flex-start">
              <Text fontWeight="600" marginTop={8} fontSize="2xl">
                Team Details
              </Text>
              <FormControl id="teamCreation" isRequired>
                <Input bg="white" placeholder="Team Name" value={props.teamName} onChange={onChangeTeamName} />
              </FormControl>
              <Input
                bg="white"
                placeholder="Team Affiliation (Optional)"
                value={props.teamAffiliation}
                onChange={onChangeTeamAffiliation}
              />
            </VStack>
          </Box>
          <Box bg="background.primary" fontWeight="600" alignItems="flex-start" w="90%" h="100%" borderRadius="4px">
            <VStack align="flex-start" marginRight={10} marginLeft={10} h="full" spacing={4}>
              <Text fontSize="2xl" marginTop={8}>
                Invite Team Members (optional)
              </Text>
              <Text fontSize="xl" fontWeight="normal">
                Enter the emails of the people you want to add
              </Text>
              <InviteTeamMembers inputList={props.inputList} setInputList={props.setInputList} />
            </VStack>
          </Box>
        </HStack>
        <Box display="flex" flexDirection="row" justifyContent="flex-end" marginTop={4}>
          <Button _focus={{ boxShadow: '#FFFFFF' }} type="submit" justifySelf="flex-end">
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateTeamForm;
