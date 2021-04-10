import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Flex, Center, Button, Text, Input, Heading, Image } from '@chakra-ui/react';
import logo from 'assets/images/logo-black.png';
import { Redirect, useParams } from 'react-router-dom';
import { RESET_PASSWORD_MUTATION } from '../../data/gql/user';

const InputPassword = props => {
  const { submitState, setState } = props;
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { token } = useParams();
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = e => {
    setPasswordConfirm(e.target.value);
  };

  const onSubmitForm = e => {
    try {
      if (password === passwordConfirm) {
        resetPassword({
          variables: {
            jwtToken: token,
            password: password,
          },
        })
          .then(data => {
            console.log(data.data);
            if (!data.data.resetPassword) {
              setState('FAIL');
            } else {
              setState('SUBMITTED');
            }
          })
          .catch(error => {
            setState('FAIL');
            console.log(error);
          });
      } else {
        setState('UNMATCHING');
      }
    } catch (error) {
      console.log(error);
      setState('FAIL');
    }
  };

  return (
    <Flex alignItems="flex-start" flexDirection="column" w="87%">
      <Box marginBottom="24px" marginTop="50px">
        <Heading size="h1" as="h1" textTransform="capitalize">
          Change Password
        </Heading>
      </Box>
      <form></form>
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
      {submitState === 'UNMATCHING' && <Text alignSelf="flex-start">The passwords you entered do not match </Text>}
      {submitState === 'FAIL' && <Text alignSelf="flex-start">Something went wrong,please try again later </Text>}
      <Button onClick={onSubmitForm} marginTop={submitState === 'INPUT' ? '20px' : '12px'} marginBottom="50px">
        Change Password
      </Button>
    </Flex>
  );
};

const ConfirmPage = props => {
  const { setState } = props;
  return (
    <Flex alignItems="flex-start" flexDirection="column" w="87%" marginTop="40px">
      <Box marginBottom="24px">
        <Heading size="h1" as="h1" textTransform="capitalize">
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
        {' '}
        Return to Login{' '}
      </Button>
    </Flex>
  );
};

const ResetPassword = () => {
  const [submitState, setState] = useState('INPUT'); //SUCCESS, FAIL
  const content = {
    INPUT: <InputPassword submitState={submitState} setState={setState} />,
    FAIL: <InputPassword submitState={submitState} setState={setState} />,
    UNMATCHING: <InputPassword submitState={submitState} setState={setState} />,
    SUBMITTED: <ConfirmPage setState={setState} />,
    CONFIRMED: <Redirect to="/login" />,
  };
  return submitState !== 'CONFIRMED' ? (
    <Flex minHeight="100vh" h="100%" w="100vw" justify="center" bg="background.login">
      <Box minW="35%" marginBottom="50px">
        <Flex justify="center" marginTop="36px" marginBottom="36px">
          <Image src={logo} w="350px" />
        </Flex>
        <Center minW="35%" borderRadius="lg" borderWidth="1px" bg="white">
          {content[submitState]}
        </Center>
      </Box>
    </Flex>
  ) : (
    content[submitState]
  );
};

export default ResetPassword;
