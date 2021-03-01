import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Flex, Input, Button, Heading, VStack } from '@chakra-ui/react';
import { register } from '../../data/actions/auth';
import { Redirect } from 'react-router-dom';

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
        if (!registered) {
          setSubmitState('FAIL');
        } else {
          // Redirect to home page after registering
          return <Redirect to={{ pathname: '/home' }} />;
        }
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
        <Flex w="100%" justify="left">
          <Heading as="h1">Create an account</Heading>
        </Flex>
        <Input name="firstName" placeholder="First Name" value={firstName} onChange={onChangeFirstName} />
        <Input name="lastName" placeholder="Last Name" value={lastName} onChange={onChangeLastName} />
        <Input name="email" placeholder="Email" value={email} onChange={onChangeEmail} />
        <Input type="password" name="password" placeholder="Password" value={password} onChange={onChangePass} />
        {submitState === 'FAIL' && (
          <Flex w="100%" justify="left">
            <p as="subtitle" size="subtitle">
              Unable to register, please try again.
            </p>
          </Flex>
        )}
        <Button role="link" width="131px" height="43px" type="submit">
          Create Account
        </Button>
      </VStack>
    </form>
  );
};

export default RegisterInput;
