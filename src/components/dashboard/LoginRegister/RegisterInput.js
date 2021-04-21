import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Text, Input, Button, Heading, VStack, FormControl, FormLabel } from '@chakra-ui/react';

import { register } from 'data/actions/auth';

const RegisterInput = () => {
  const client = useApolloClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [submitState, setSubmitState] = useState('');
  const dispatch = useDispatch();

  const handleClick = async e => {
    e.preventDefault();
    dispatch(register(firstName, lastName, email, password, client)).then(
      registered => {
        if (!registered) setSubmitState('FAIL');
      },
      error => {
        setSubmitState('FAIL');
      },
    );
  };

  const onChangeFirstName = e => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = e => {
    setLastName(e.target.value);
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePass = e => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={e => handleClick(e)}>
      <VStack spacing="24px">
        <Heading size="h1" as="h1" alignSelf="flex-start">
          Create an account
        </Heading>
        <FormControl id="firstName">
          <FormLabel>First Name</FormLabel>
          <Input
            name="firstName"
            placeholder="Enter first name"
            value={firstName}
            onChange={onChangeFirstName}
            isRequired
          />
        </FormControl>
        <FormControl id="lastName">
          <FormLabel>Last Name</FormLabel>
          <Input
            name="lastName"
            placeholder="Enter last name"
            value={lastName}
            onChange={onChangeLastName}
            isRequired
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={email}
            onChange={onChangeEmail}
            isRequired
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="8+ characters"
            name="password"
            value={password}
            onChange={onChangePass}
            isRequired
            minLength={8}
          />
        </FormControl>
        {submitState === 'FAIL' && <Text alignSelf="flex-start">Unable to register, please try again.</Text>}
        <Button role="link" width="131px" height="43px" type="submit">
          Create Account
        </Button>
      </VStack>
    </form>
  );
};

export default RegisterInput;
