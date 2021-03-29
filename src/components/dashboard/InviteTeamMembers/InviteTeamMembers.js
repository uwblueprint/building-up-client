import React from 'react';

import { Box, Button, Input, FormControl, Flex, VStack } from '@chakra-ui/react';

const InviteTeamMembers = ({
  inputList,
  setInputList,
  handleSubmit,
  isSubmitLoading,
  withSubmitButton,
  isEmailRequired,
}) => {
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index] = value;
    setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, '']);
  };

  return (
    <Box as={handleSubmit ? 'form' : undefined} w="100%" onSubmit={handleSubmit}>
      <VStack align="flex-start">
        {inputList.map((x, i) => {
          return (
            <Flex key={i} mb="8px" w="100%">
              <FormControl w="80%">
                <Input
                  bg="white"
                  type="email"
                  name="email"
                  placeholder="Email"
                  isRequired={isEmailRequired}
                  value={x}
                  onChange={e => handleInputChange(e, i)}
                />
              </FormControl>
              {inputList.length !== 1 ? (
                <Button variant="ghost" onClick={() => handleRemoveClick(i)} maxW="15%">
                  x
                </Button>
              ) : null}
            </Flex>
          );
        })}
        <Button variant="link" mb="40px" fontSize="16px" onClick={handleAddClick}>
          + Add Another
        </Button>
        {withSubmitButton && (
          <Button size="lg" type="submit" isLoading={isSubmitLoading}>
            Send Invites
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default InviteTeamMembers;
