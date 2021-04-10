import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Input, Button, Heading, Text, VStack, FormControl, FormLabel } from '@chakra-ui/react';

import { login } from 'data/actions/auth';

const LoginInput = props => {
  const { setLoginRegister } = props;
  const client = useApolloClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitState, setSubmitState] = useState('');
  const dispatch = useDispatch();

  const handleClick = async e => {
    e.preventDefault();
    dispatch(login(email, password, client)).then(
      loggedIn => {
        if (!loggedIn) setSubmitState('FAIL');
      },
      error => {
        setSubmitState('FAIL');
      },
    );
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
        <Heading alignSelf="flex-start" size="h1" as="h1">
          Welcome
        </Heading>
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
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={onChangePass}
            mb="8px"
            isRequired
          />
        </FormControl>
        <Button
          bg="white"
          onClick={() => setLoginRegister('RESET')}
          focus={{ boxShadow: 'white' }}
          alignSelf="flex-start"
        >
          Forgot Password?
        </Button>
        {submitState === 'FAIL' && <Text alignSelf="flex-start">Oops! Check your credentials and try again.</Text>}
        <Button role="link" width="131px" height="43px" type="submit">
          Sign In
        </Button>
      </VStack>
    </form>
  );
};

export default LoginInput;
