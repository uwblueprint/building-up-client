import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Input, Link, Button, Heading, Flex, VStack, Box } from '@chakra-ui/react';
import { login } from '../../data/actions/auth';

const LoginInput = () => {
  const client = useApolloClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleClick = async e => {
    e.preventDefault();
    dispatch(login(email, password, client));
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePass = e => {
    setPassword(e.target.value);
  };

  return (
    <Box>
      <VStack spacing="24px">
        <Flex w="100%" justify="left">
          <Heading as="h1">Welcome lorem</Heading>
        </Flex>
        <Input type="email" name="email" placeholder="Email" value={email} onChange={onChangeEmail} />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChangePass}
          mb="8px"
        />
      </VStack>
      <Link>Forgot Password?</Link>
      <Flex justify="center" mt="24px">
        <Button role="link" onClick={handleClick} width="131px" height="43px">
          Sign In
        </Button>
      </Flex>
    </Box>
  );
};

export default LoginInput;
