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
        <Flex w="100%" justify="left">
          <Heading as="h1">Create an account</Heading>
        </Flex>
        <Input
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={onChangeFirstName}
          isRequired={true}
        />
        <Input name="lastName" placeholder="Last Name" value={lastName} onChange={onChangeLastName} isRequired={true} />
        <Input type="email" name="email" placeholder="Email" value={email} onChange={onChangeEmail} isRequired={true} />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChangePass}
          isRequired={true}
        />
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
