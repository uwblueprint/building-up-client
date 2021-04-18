import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Flex, Center, Button, Text, Input, Heading, Image } from '@chakra-ui/react';
import logo from 'assets/images/logo-black.png';
import { Redirect, useParams } from 'react-router-dom';
import { RESET_PASSWORD_MUTATION } from '../../data/gql/user';

const InputPassword = props => {
  const { submitState, setState } = props;
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isNotLoading, setIsNotLoading] = useState(false);
  const { token } = useParams();
  const [resetPassword, { loading, data, error }] = useMutation(RESET_PASSWORD_MUTATION);

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = e => {
    setPasswordConfirm(e.target.value);
  };

  useEffect(() => {
    if (error) {
      setState('FAIL');
    }
  }, [error, setState]);

  useEffect(() => {
    if (data) {
      console.log(data);
      if (!data.resetPassword) {
        setState('FAIL');
      } else {
        setState('SUBMITTED');
      }
    }
  }, [data, setState]);

  useEffect(() => {
    console.log(loading);
    setIsNotLoading(loading);
  }, [loading, setState]);

  const onSubmitForm = e => {
    e.preventDefault();
    if (password === passwordConfirm) {
      resetPassword({
        variables: {
          jwtToken: token,
          password: password,
        },
      });
    } else {
      setState('PWS_DO_NOT_MATCH');
    }
  };

  return (
    <Flex alignItems="flex-start" flexDirection="column" w="87%">
      <Box marginBottom="24px" marginTop="50px">
        <Heading size="h1" as="h1">
          Change Password
        </Heading>
      </Box>
      <form onSubmit={onSubmitForm}>
        <Text marginBottom="8px">New Password</Text>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChangePassword}
          isRequired
          marginBottom="26px"
        />
        <Text marginBottom="8px">Re-enter Your Password</Text>
        <Input
          type="password"
          name="passwordconfirm"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
          isRequired
          marginBottom={submitState === 'INPUT' ? '20px' : '12px'}
        />
        {submitState === 'PWS_DO_NOT_MATCH' && (
          <Text alignSelf="flex-start">The passwords you entered do not match </Text>
        )}
        {submitState === 'FAIL' && <Text alignSelf="flex-start">Something went wrong,please try again later </Text>}
        <Button
          type="submit"
          marginTop={submitState === 'INPUT' ? '20px' : '12px'}
          marginBottom="50px"
          isDisabled={isNotLoading}
        >
          Change Password
        </Button>
      </form>
    </Flex>
  );
};

const ConfirmPage = props => {
  const { setState } = props;
  return (
    <Flex alignItems="flex-start" flexDirection="column" w="87%" marginTop="40px">
      <Box marginBottom="24px">
        <Heading size="h1" as="h1">
          Change Password
        </Heading>
      </Box>
      <Text marginBottom="40px">You've successfully updated your password!</Text>
      <Button
        onClick={() => {
          setState('CONFIRMED');
        }}
        marginBottom="50px"
      >
        Return to Login
      </Button>
    </Flex>
  );
};

const ResetPassword = () => {
  const [submitState, setState] = useState('INPUT');
  return (
    <Flex minHeight="100vh" h="100%" w="100vw" justify="center" bg="background.login">
      <Box minW="35%" marginBottom="50px">
        <Flex justify="center" marginTop="36px" marginBottom="36px">
          <Image src={logo} w="350px" />
        </Flex>
        <Center minW="35%" borderRadius="lg" borderWidth="1px" bg="white">
          {submitState === 'INPUT' || submitState === 'FAIL' || submitState === 'PWS_DO_NOT_MATCH' ? (
            <InputPassword submitState={submitState} setState={setState} />
          ) : submitState === 'SUBMITTED' ? (
            <ConfirmPage setState={setState} />
          ) : (
            <Redirect to="/login" />
          )}
        </Center>
      </Box>
    </Flex>
  );
};

export default ResetPassword;
