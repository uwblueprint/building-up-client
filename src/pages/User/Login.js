import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { login } from '../../data/actions/auth';

function Login() {
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
    <div>
      <Heading as="h1">Login Page</Heading>
      <Box w="50%">
        <form onSubmit={handleClick}>
          <div>
            <Input type="email" name="email" placeholder="Email" value={email} onChange={onChangeEmail} />
          </div>
          <div>
            <Input type="password" name="password" placeholder="Password" value={password} onChange={onChangePass} />
          </div>
          <Button role="link">Login</Button>
        </form>
      </Box>
    </div>
  );
}

export default Login;
